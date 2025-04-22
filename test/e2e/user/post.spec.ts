import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@app/app.module';
import request from 'supertest';
import { Encrypter } from '@core/types';
import { UserRepositoryInterface } from '@domain/user/repositories';
import { ApplyCreateUserUseCase } from '@infra/http/use-cases';
import { User } from '@domain/user/entities';
import { PostRepositoryInterface } from '@domain/feed/repositories';

describe('Post controller E2E', () => {
  let app: INestApplication;
  let encrypter: Encrypter
  let userRepository: UserRepositoryInterface
  let applyCreateUserUseCase: ApplyCreateUserUseCase
  let postRepository: PostRepositoryInterface
  
  let user: User | null
  let token: string

  const dataUser = {
    name: 'John Doe',
    email: 'john.doe@email.com',
    password: 'password123',
    confirmPassword: 'password123',
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    applyCreateUserUseCase = moduleFixture.get<ApplyCreateUserUseCase>(ApplyCreateUserUseCase);
    encrypter = moduleFixture.get<Encrypter>(Encrypter);
    userRepository = moduleFixture.get<UserRepositoryInterface>(UserRepositoryInterface)
    postRepository = moduleFixture.get<PostRepositoryInterface>(PostRepositoryInterface)
    await app.init();

    await applyCreateUserUseCase.execute(dataUser);

    user = await userRepository.findByEmail(dataUser.email)
    token = await encrypter.encrypt({
      sub: {
        id: user?.id,
        email: user?.email,
      }})
  });

  afterAll(async () => {
    await app.close();

    if (global['stopPostgresContainer']) {
      await global['stopPostgresContainer']();
    }
  });
  it('should be able to create a post', async () => {
    const response = await request(app.getHttpServer()).post('/post').set({
      Authorization: `Bearer ${token}`,
    })
    .send({
      content: 'Hello World',
    })
    
    expect(response.status).toBe(201);
  })
  it('should be able to get all posts', async () => {
    const response = await request(app.getHttpServer()).get('/post').set({
      Authorization: `Bearer ${token}`,
    })
    expect(response.status).toBe(200);
  })
  it('should be able to like a post', async () => {
    const { data } = await postRepository.findAll({});
    const response = await request(app.getHttpServer()).post('/post/like').set({
      Authorization: `Bearer ${token}`,
    })
    .send({
      postId: data[0].id,
    })
    expect(response.status).toBe(201);
  })
});
