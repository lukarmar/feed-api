import { SessionUseCase } from "@domain/user/user-cases";
import { EncrypterMock, HashComparerMock, UserRepositoryMock } from "@test/mocks/repository";
import { SessionUserUseCaseType } from "@domain/user/types/user-cases";

import { faker } from "@faker-js/faker/.";
import { User } from "@domain/user/entities";
import { UnauthorizedException } from "@nestjs/common";

describe('SessionUseCase', () => {
  jest.useFakeTimers().setSystemTime(new Date('2021-09-01T00:00:00.000Z'));

  let sessionUseCase: SessionUserUseCaseType;

  const userFixture = User.create({
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password: faker.internet.password(),
  })

 
 beforeEach(() => {
    sessionUseCase = new SessionUseCase(
      UserRepositoryMock,
      EncrypterMock,
      HashComparerMock,
    )
  });

  it('should create a new session', async () => {
    UserRepositoryMock.findByEmail.mockResolvedValue(userFixture);
    HashComparerMock.compare.mockResolvedValue(true);

    const accessToken = faker.internet.jwt()
    EncrypterMock.encrypt.mockResolvedValue(accessToken);

    const result = await sessionUseCase.execute({
      email: userFixture.email,
      password: userFixture.password,
    })

    expect(UserRepositoryMock.findByEmail).toHaveBeenCalledWith(userFixture.email);
    expect(HashComparerMock.compare).toHaveBeenCalledWith(
      userFixture.password,
      userFixture.password,
    )
    expect(EncrypterMock.encrypt).toHaveBeenCalledWith({
      sub: {
        id: userFixture.id,
        email: userFixture.email,
      },
    })
    expect(result).toEqual({accessToken})
  })

  it('should throw an error if user not found', async () => {
    UserRepositoryMock.findByEmail.mockResolvedValue(null);

    await expect(
      sessionUseCase.execute({
        email: userFixture.email,
        password: userFixture.password,
      }),
    ).rejects.toThrow(new UnauthorizedException('User or Password is incorrect'));

    expect(UserRepositoryMock.findByEmail).toHaveBeenCalledWith(userFixture.email);
  })

  it('should throw an error if password is incorrect', async () => {
    UserRepositoryMock.findByEmail.mockResolvedValue(userFixture);
    HashComparerMock.compare.mockResolvedValue(false);

    await expect(
      sessionUseCase.execute({
        email: userFixture.email,
        password: userFixture.password,
      }),
    ).rejects.toThrow(new UnauthorizedException('User or Password is incorrect'));

    expect(UserRepositoryMock.findByEmail).toHaveBeenCalledWith(userFixture.email);
  })
  it('should throw an error if encrypt fails', async () => {
    UserRepositoryMock.findByEmail.mockResolvedValue(userFixture);
    HashComparerMock.compare.mockResolvedValue(true);
    EncrypterMock.encrypt.mockRejectedValue(new Error('Encrypt error'));

    await expect(
      sessionUseCase.execute({
        email: userFixture.email,
        password: userFixture.password,
      }),
    ).rejects.toThrow(new Error('Encrypt error'));

    expect(UserRepositoryMock.findByEmail).toHaveBeenCalledWith(userFixture.email);
  }
  )
  it('should throw an error if hash comparison fails', async () => {
    UserRepositoryMock.findByEmail.mockResolvedValue(userFixture);
    HashComparerMock.compare.mockRejectedValue(new Error('Hash comparison error'));

    await expect(
      sessionUseCase.execute({
        email: userFixture.email,
        password: userFixture.password,
      }),
    ).rejects.toThrow(new Error('Hash comparison error'));

    expect(UserRepositoryMock.findByEmail).toHaveBeenCalledWith(userFixture.email);
  }
  )

})