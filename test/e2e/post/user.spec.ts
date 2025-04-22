import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@app/app.module';
import request from 'supertest';
import { Encrypter } from '@core/types';
import { UserRepositoryInterface } from '@domain/user/repositories';

describe('User controller E2E', () => {
  let app: INestApplication;
  let encrypter: Encrypter
  let userRepository: UserRepositoryInterface

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
    encrypter = moduleFixture.get<Encrypter>(Encrypter);
    userRepository = moduleFixture.get<UserRepositoryInterface>(UserRepositoryInterface)
    await app.init();
  });

  afterAll(async () => {
    await app.close();

    if (global['stopPostgresContainer']) {
      await global['stopPostgresContainer']();
    }
  });

  it('should be create a new user', async () => {
    const response = await request(app.getHttpServer()).post('/user').send(dataUser);
    expect(response.status).toBe(201);
  });
  it('should get all users', async () => {
    const user = await userRepository.findByEmail(dataUser.email)

    const token = await encrypter.encrypt({
      sub: {
        id: user?.id,
        email: user?.email,
      }
    })
    const response = await request(app.getHttpServer()).get('/user').set({
      Authorization: `Bearer ${token}`,
    })
    expect(response.status).toBe(200);
  })

  it('should be able to update a user', async () => {
    const user = await userRepository.findByEmail(dataUser.email)

    const token = await encrypter.encrypt({
      sub: {
        id: user?.id,
        email: user?.email,
      }
    })
    const response = await request(app.getHttpServer()).patch(`/user/${user?.id}`).set({
      Authorization: `Bearer ${token}`,
    }).send({
      name: 'John Doe Updated',
    })
    expect(response.status).toBe(200);
  })

  it('should be able to delete a user', async () => {
    const user = await userRepository.findByEmail(dataUser.email)

    const token = await encrypter.encrypt({
      sub: {
        id: user?.id,
        email: user?.email,
      }
    })
    const response = await request(app.getHttpServer()).delete(`/user/${user?.id}`).set({
      Authorization: `Bearer ${token}`,
    })
    expect(response.status).toBe(200);
  })
});
