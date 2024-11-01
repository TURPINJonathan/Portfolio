<?php

declare(strict_types=1);

use App\Entity\User;
use PHPUnit\Framework\Attributes\TestDox;
use PHPUnit\Framework\TestCase;

#[TestDox('USER TEST')]
class UserTest extends TestCase
{
    #[TestDox('User creation success')]
    public function testUserCreationSuccess(): void
    {
        $email    = 'test@example.com';
        $password = 'password123';
        $role     = 'admin';

        $user = new User($email, $password, $role);

        $this->assertSame($email, $user->getEmail());
        $this->assertSame($password, $user->getPassword());
        $this->assertContains($role, $user->getRoles());
    }

    #[TestDox('User creation failure')]
    public function testUserCreationFailure(): void
    {
        $this->expectException(InvalidArgumentException::class);

        $email    = 'invalid-email';
        $password = '';
        $role     = 'unknown-role';

        new User($email, $password, $role);
    }
}
