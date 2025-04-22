import { PostRepositoryMock } from "@test/mocks/repository";
import { GetAllPostFixture } from "@test/fixture/repository";
import { GetAllPostUseCaseType } from "@domain/feed/types/user-cases";
import { GetAllPostUseCase } from "@domain/feed/use-cases";

describe('GetAllPostUseCase', () => {
  jest.useFakeTimers().setSystemTime(new Date('2021-09-01T00:00:00.000Z'));

  let getAllPostUseCase: GetAllPostUseCaseType;

  
 beforeEach(() => {
  getAllPostUseCase = new GetAllPostUseCase(PostRepositoryMock);
 })


  it('should get all posts', async () => {
    PostRepositoryMock.findAll.mockResolvedValue(GetAllPostFixture)
    
    const sut = await getAllPostUseCase.execute({})
    
    expect(sut).toEqual({
      ...GetAllPostFixture,
      data: GetAllPostFixture.data.map((post) => ({
        id: post.id,
        content: post.content,
        userId: post.userId,
        likesCount: post.likesCount,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        likes: post?.likes?.map((like) => ({
          id: like.id,
          userId: like.userId,
          postId: like.postId,
          isActive: like.isActive,
          createdAt: like.createdAt,
          updatedAt: like.updatedAt,
        })),
      })),
    });
   })

   it('should get all posts with pagination', async () => {    
    PostRepositoryMock.findAll.mockResolvedValue(GetAllPostFixture)
   
       const sut = await getAllPostUseCase.execute({
        page: 1,
        limit: 10,
       })
       
       expect(sut).toEqual({
         ...GetAllPostFixture,
         data: GetAllPostFixture.data.map((post) => ({
           id: post.id,
           content: post.content,
           likesCount: post.likesCount,
           createdAt: post.createdAt,
           updatedAt: post.updatedAt,
           userId: post.userId,
           likes: post?.likes?.map((like) => ({
            id: like.id,
            userId: like.userId,
            postId: like.postId,
            isActive: like.isActive,
            createdAt: like.createdAt,
            updatedAt: like.updatedAt,
          })),
         })),
       });
     })
  it('should get empty data', async () => {
      PostRepositoryMock.findAll.mockResolvedValue({
         ...GetAllPostFixture,
         data: [],
       })
   
       const sut = await getAllPostUseCase.execute({
         page: 1,
         limit: 10,
       })
       
       expect(sut).toEqual({
         ...GetAllPostFixture,
         data: [],
       });
     })
})