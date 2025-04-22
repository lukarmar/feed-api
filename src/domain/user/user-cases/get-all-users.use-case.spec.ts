import { GetAllUsersUseCase } from "@domain/user/user-cases";
import { UserRepositoryMock } from "@test/mocks/repository";
import { GetAllUsersUseCaseType } from "@domain/user/types/user-cases";
import { GetAllUsersFixture } from "@test/fixture/repository";

describe('GetAllUsersUseCase', () => {
  jest.useFakeTimers().setSystemTime(new Date('2021-09-01T00:00:00.000Z'));

  let createUserUseCase: GetAllUsersUseCaseType;
 
 beforeEach(() => {
    createUserUseCase = new GetAllUsersUseCase(
      UserRepositoryMock,
    );
  });

  it('should get all users', async () => {
    
    UserRepositoryMock.findAll.mockResolvedValue(GetAllUsersFixture)

    const sut = await createUserUseCase.execute({})
    
    expect(sut).toEqual({
      ...GetAllUsersFixture,
      data: GetAllUsersFixture.data.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })),
    });
  })

  it('should get all users with pagination', async () => {
    
    UserRepositoryMock.findAll.mockResolvedValue(GetAllUsersFixture)

    const sut = await createUserUseCase.execute({
      page: 1,
      limit: 10,
    })
    
    expect(sut).toEqual({
      ...GetAllUsersFixture,
      data: GetAllUsersFixture.data.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })),
    });
  })
  it('should get empty data', async () => {
    UserRepositoryMock.findAll.mockResolvedValue({
      ...GetAllUsersFixture,
      data: [],
    })

    const sut = await createUserUseCase.execute({
      page: 1,
      limit: 10,
    })
    
    expect(sut).toEqual({
      ...GetAllUsersFixture,
      data: [],
    });
  })
})