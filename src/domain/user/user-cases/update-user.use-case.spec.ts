import { UpdateUserUseCase } from "@domain/user/user-cases";
import { UserRepositoryMock } from "@test/mocks/repository";
import { UpdateUserUseCaseType } from "@domain/user/types/user-cases";
import { faker } from '@faker-js/faker';
import { User } from "@domain/user/entities";
import { BadRequestException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { SessionDataUserHelper } from "@core/helpers";

describe('UpdateUserUseCase', () => {
  jest.useFakeTimers().setSystemTime(new Date('2021-09-01T00:00:00.000Z'));

  let updateUserUseCase: UpdateUserUseCaseType;
    let sessionDataUserHelper: SessionDataUserHelper;
  

  const input = {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
  }

  const userFixture = User.create({
    email: input.email,
    name: input.name,
    password: faker.internet.password(),
  });


  beforeEach(() => {
    sessionDataUserHelper = new SessionDataUserHelper();
    updateUserUseCase = new UpdateUserUseCase(
      UserRepositoryMock,
      sessionDataUserHelper,
    );
  });

  it('should update user email data', async () => {
    
    UserRepositoryMock.findById.mockResolvedValue(userFixture);
    jest.spyOn(sessionDataUserHelper, 'sessionData', 'get').mockReturnValue({
      id: userFixture.id,
      email: userFixture.email,
    });

    await updateUserUseCase.execute({
      id: input.id,
      email: input.email,
    })

    expect(UserRepositoryMock.findById).toHaveBeenCalledWith(input.id);
    expect(UserRepositoryMock.update).toHaveBeenCalledWith(input.id, 
      expect.objectContaining({
        email: input.email,
      }),
    );
  })

  it('should update user name data', async () => {
    
    UserRepositoryMock.findById.mockResolvedValue(userFixture);
    jest.spyOn(sessionDataUserHelper, 'sessionData', 'get').mockReturnValue({
      id: userFixture.id,
      email: userFixture.email,
    });

    await updateUserUseCase.execute({
      id: input.id,
      name: input.name,
    })

    expect(UserRepositoryMock.findById).toHaveBeenCalledWith(input.id);
    expect(UserRepositoryMock.update).toHaveBeenCalledWith(input.id, 
      expect.objectContaining({
        name: input.name,
      }),
    );
  })
  it('should update user email and name data', async () => {
    UserRepositoryMock.findById.mockResolvedValue(userFixture);
    jest.spyOn(sessionDataUserHelper, 'sessionData', 'get').mockReturnValue({
      id: userFixture.id,
      email: userFixture.email,
    });

    await updateUserUseCase.execute({
      id: input.id,
      email: input.email,
      name: input.name,
    })

    expect(UserRepositoryMock.findById).toHaveBeenCalledWith(input.id);
    expect(UserRepositoryMock.update).toHaveBeenCalledWith(input.id, 
      expect.objectContaining({
        email: input.email,
        name: input.name,
      }),
    );
  }
  )
  it('should throw NotFoundException if user not found', async () => {
    UserRepositoryMock.findById.mockResolvedValue(null);

    await expect(updateUserUseCase.execute({
      id: input.id,
      email: input.email,
    })).rejects.toThrow(new NotFoundException('User not found'));
  }
  )

  it('should throw BadRequestException if error occurs', async () => {
    UserRepositoryMock.findById.mockResolvedValue(userFixture);
    jest.spyOn(sessionDataUserHelper, 'sessionData', 'get').mockReturnValue({
      id: userFixture.id,
      email: userFixture.email,
    });

    UserRepositoryMock.update.mockRejectedValue(new Error('Error'));

    await expect(updateUserUseCase.execute({
      id: input.id,
      email: input.email,
    })).rejects.toThrow(new BadRequestException('Error update user'));
  })

   it('should throw UnauthorizedException if user is not authorized', async () => {
      UserRepositoryMock.findById.mockResolvedValue(userFixture);
      jest.spyOn(sessionDataUserHelper, 'sessionData', 'get').mockReturnValue({
        id: faker.string.uuid(),
        email: userFixture.email,
      });
  
      await expect(updateUserUseCase.execute({
        id: input.id,
        name: input.name,
        email: input.email,
      })).rejects.toThrow(UnauthorizedException);
  
      expect(UserRepositoryMock.findById).toHaveBeenCalledWith(input.id);
    })
})