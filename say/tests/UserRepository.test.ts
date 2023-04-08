import { CreateUser } from '../src/backend/db/repositories/users/IUserRepository';
import { UserRepository } from '../src/backend/db/repositories/users/UserRepository';
import {describe, expect, test, beforeEach, beforeAll, afterAll} from '@jest/globals';
import { PrismaClient, User } from "@prisma/client";

describe("UserRepository", () => {
  let userRepository: UserRepository;
  let prisma: PrismaClient;

  beforeAll(async () => {
    // Initialize the Prisma client and UserRepository before all tests
    prisma = new PrismaClient();
    userRepository = new UserRepository(prisma);
  });

  afterAll(async () => {
    // Disconnect the Prisma client after all tests
    await prisma.$disconnect();
  });

  test("should create a user", async () => {
    // Setup
    const user: CreateUser = {
      email: "test@example.com",
    };

    // Exercise
    const createdUser = await userRepository.createUser(user);

    // Verify
    expect(createdUser).toBeDefined();
    expect(createdUser.id).not.toBeNull();
    expect(createdUser.email).toBe(user.email);

    // Cleanup
    await userRepository.deleteUser(createdUser.id);
  });

  test("should get a user by id", async () => {
    // Setup
    const user: CreateUser = {
      email: "test@example.com",
    };
    const createdUser = await userRepository.createUser(user);

    // Exercise
    const fetchedUser = await userRepository.getUserById(createdUser.id);

    // Verify
    expect(fetchedUser).toBeDefined();
    expect(fetchedUser?.id).toBe(createdUser.id);
    expect(fetchedUser?.email).toBe(createdUser.email);

    // Cleanup
    await userRepository.deleteUser(createdUser.id);
  });

  test("should update a user", async () => {
    // Setup
    const user: CreateUser = {
      email: "test@example.com",
    };
    const createdUser = await userRepository.createUser(user);
    const updatedUser: User = {
      ...createdUser,
      email: "updated@example.com",
    };

    // Exercise
    const resultUser = await userRepository.updateUser(updatedUser);

    // Verify
    expect(resultUser).toBeDefined();
    expect(resultUser.id).toBe(createdUser.id);
    expect(resultUser.email).toBe(updatedUser.email);

    // Cleanup
    await userRepository.deleteUser(createdUser.id);
  });

  test("should delete a user", async () => {
    // Setup
    const user: CreateUser = {
      email: "test@example.com",
    };
    const createdUser = await userRepository.createUser(user);

    // Exercise
    const deletedUser = await userRepository.deleteUser(createdUser.id);

    // Verify
    expect(deletedUser).toBeDefined();
    expect(deletedUser?.id).toBe(createdUser.id);
    expect(deletedUser?.email).toBe(createdUser.email);

    // Check if the user is actually deleted
    const fetchedUser = await userRepository.getUserById(createdUser.id);
    expect(fetchedUser).toBeNull();
  });
});
