<?php

declare(strict_types=1);

namespace App\DataFixtures;

use App\Entity\Module;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Persistence\ObjectManager;

class ModulesFixtures extends Fixture
{
    private ManagerRegistry $managerRegistry;

    public function __construct(ManagerRegistry $managerRegistry)
    {
        $this->managerRegistry = $managerRegistry;
    }

    public function load(ObjectManager $manager): void
    {
        $this->addModuleIfNotExists($manager, 'Dashboard', 'tachometer-alt', [
            'title_color'                => '#FF5733',
            'text_color'                 => '#333333',
            'primary_background_color'   => '#FFFFFF',
            'secondary_background_color' => '#F0F0F0',
        ]);
        $this->addModuleIfNotExists($manager, 'Users', 'users', [
            'title_color'                => '#33FF57',
            'text_color'                 => '#333333',
            'primary_background_color'   => '#FFFFFF',
            'secondary_background_color' => '#F0F0F0',
        ]);
        $this->addModuleIfNotExists($manager, 'Settings', 'cogs', [
            'title_color'                => '#3357FF',
            'text_color'                 => '#333333',
            'primary_background_color'   => '#FFFFFF',
            'secondary_background_color' => '#F0F0F0',
        ]);
        $this->addModuleIfNotExists($manager, 'Reports', 'chart-line', [
            'title_color'                => '#FF33A1',
            'text_color'                 => '#333333',
            'primary_background_color'   => '#FFFFFF',
            'secondary_background_color' => '#F0F0F0',
        ]);

        $manager->flush();
    }

    private function addModuleIfNotExists(ObjectManager $manager, string $name, string $icon, array $options): void
    {
        $moduleRepository = $this->managerRegistry->getRepository(Module::class);
        $existingModule   = $moduleRepository->findOneBy(['name' => $name]);

        if (!$existingModule) {
            $module = new Module();
            $module->setName($name);
            $module->setIcon($icon);
            $module->setOptions($options);

            $manager->persist($module);
        }
    }
}
