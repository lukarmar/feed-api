import { UserRepositoryMock } from "@test/mocks/repository";
import { DeleteUserUseCaseType } from "@domain/user/types/user-cases";
import { faker } from '@faker-js/faker';
import { User } from "@domain/user/entities";
import { BadRequestException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { DeleteUserUseCase } from "@domain/user/user-cases/delete-user.use-case";
import { SessionDataUserHelper } from "@core/helpers";

describe('DeleteUserUseCase', () => {
  jest.useFakeTimers().setSystemTime(new Date('2021-09-01T00:00:00.000Z'));

  let deleteUserUseCase: DeleteUserUseCaseType;
  let sessionDataUserHelper: SessionDataUserHelper;

  const input = {
    id: faker.string.uuid(),
  }

  const userFixture = User.create({
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password: faker.internet.password(),
  });


  beforeEach(() => {
    sessionDataUserHelper = new SessionDataUserHelper();
    deleteUserUseCase = new DeleteUserUseCase(
      UserRepositoryMock,
      sessionDataUserHelper

    );
  });

  it('should delete user', async () => {
    
    UserRepositoryMock.findById.mockResolvedValue(userFixture);
    jest.spyOn(sessionDataUserHelper, 'sessionData', 'get').mockReturnValue({
      id: userFixture.id,
      email: userFixture.email,
    });

    await deleteUserUseCase.execute({
      id: input.id,
    })

    expect(UserRepositoryMock.findById).toHaveBeenCalledWith(input.id);
    expect(UserRepositoryMock.delete).toHaveBeenCalledWith(input.id);
  })
  it('should throw NotFoundException if user not found', async () => {
    
    UserRepositoryMock.findById.mockResolvedValue(null);

    await expect(deleteUserUseCase.execute({
      id: input.id,
    })).rejects.toThrow(NotFoundException);

    expect(UserRepositoryMock.findById).toHaveBeenCalledWith(input.id);
  })
  it('should throw BadRequestException if user not found', async () => {
    
    UserRepositoryMock.findById.mockResolvedValue(userFixture);
    UserRepositoryMock.delete.mockRejectedValue(new Error('Error deleting user'));

    await expect(deleteUserUseCase.execute({
      id: input.id,
    })).rejects.toThrow(BadRequestException);

    expect(UserRepositoryMock.findById).toHaveBeenCalledWith(input.id);
  })

  it('should throw UnauthorizedException if user is not authorized', async () => {
    UserRepositoryMock.findById.mockResolvedValue(userFixture);
    jest.spyOn(sessionDataUserHelper, 'sessionData', 'get').mockReturnValue({
      id: faker.string.uuid(),
      email: userFixture.email,
    });

    await expect(deleteUserUseCase.execute({
      id: input.id,
    })).rejects.toThrow(UnauthorizedException);

    expect(UserRepositoryMock.findById).toHaveBeenCalledWith(input.id);
  })
})