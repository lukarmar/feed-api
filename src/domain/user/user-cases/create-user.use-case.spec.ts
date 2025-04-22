import { CreateUserUseCase } from "@domain/user/user-cases";
import { HashGeneratorMock, UserRepositoryMock } from "@test/mocks/repository";
import { CreateUserUseCaseType } from "@domain/user/types/user-cases";
import { faker } from '@faker-js/faker';
import { User } from "@domain/user/entities";
import { BadRequestException, ConflictException } from "@nestjs/common";

describe('CreateUserUseCase', () => {
  jest.useFakeTimers().setSystemTime(new Date('2021-09-01T00:00:00.000Z'));

  let createUserUseCase: CreateUserUseCaseType;


  const password = faker.internet.password();
  const input = {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password,
    confirmPassword: password,
  }

  const userFixture = User.create({
    email: input.email,
    name: input.name,
    password: input.password,
  })

  beforeEach(() => {
    createUserUseCase = new CreateUserUseCase(
      UserRepositoryMock,
      HashGeneratorMock
    );
  });

  it('should create a new user', async () => {
    UserRepositoryMock.findByEmail.mockResolvedValue(null);
    
    UserRepositoryMock.create.mockResolvedValue(userFixture);
    const sut = await createUserUseCase.execute(input)
    expect(UserRepositoryMock.findByEmail).toHaveBeenCalledWith(input.email);
    expect(HashGeneratorMock.generateHash).toHaveBeenCalledWith(input.password);
    expect(sut).toEqual({
      id: userFixture.id,
      name: userFixture.name,
      email: userFixture.email,
      createdAt: userFixture.createdAt,
      updatedAt: userFixture.updatedAt,
    });
  })

  it('should throw a ConflictException if user already exists', async () => {
    UserRepositoryMock.findByEmail.mockResolvedValue(userFixture);
    await expect(createUserUseCase.execute(input)).rejects.toThrow(
      new ConflictException({
        message: "User already exists",
      })
    );
  })

  it('should throw a BadRequestException if an error occurs', async () => {
    UserRepositoryMock.findByEmail.mockResolvedValue(null);
    UserRepositoryMock.create.mockRejectedValue(new Error('Error creating user'));
    await expect(createUserUseCase.execute(input)).rejects.toThrow(
      new BadRequestException({
        message: "Error creating user",
        error: new Error('Error creating user'),
      })
    );
  })

  it('should throw a ConflictException if password and confirmPassword do not match', async () => {
    const inputWithDifferentPassword = {
      ...input,
      confirmPassword: faker.internet.password(),
    }
    await expect(createUserUseCase.execute(inputWithDifferentPassword)).rejects.toThrow(
      new ConflictException({
        message: "Passwords do not match",
      })
    );
  })
})