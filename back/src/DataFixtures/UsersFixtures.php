<?php

declare(strict_types=1);

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UsersFixtures extends Fixture
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        // Create an admin user
        $adminUser     = new User('admin@admin.fr', ['ROLE_ADMIN']);
        $adminPassword = $this->passwordHasher->hashPassword($adminUser, '1505Admin+');
        $adminUser->setPassword($adminPassword);
        $manager->persist($adminUser);

        // Create a regular user
        $regularUser     = new User('user@example.com', ['ROLE_USER']);
        $regularPassword = $this->passwordHasher->hashPassword($regularUser, 'UserPassword123');
        $regularUser->setPassword($regularPassword);
        $manager->persist($regularUser);

        $manager->flush();
    }
}
