<?php

declare(strict_types=1);

namespace App\DataFixtures;

use App\Entity\Skill;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Persistence\ObjectManager;

class SkillsFixtures extends Fixture
{
    private ManagerRegistry $managerRegistry;

    public function __construct(ManagerRegistry $managerRegistry)
    {
        $this->managerRegistry = $managerRegistry;
    }

    public function load(ObjectManager $manager): void
    {
        $skills = [
            ['name' => 'Symfony', 'icon' => 'fa-symfony', 'color' => '#000000', 'isHardSkill' => true],
            ['name' => 'Vue.js', 'icon' => 'fa-vuejs', 'color' => '#42b883', 'isHardSkill' => true],
            ['name' => 'React', 'icon' => 'fa-react', 'color' => '#61dafb', 'isHardSkill' => true],
            ['name' => 'PHP', 'icon' => 'fa-php', 'color' => '#777bb4', 'isHardSkill' => true],
            ['name' => 'JavaScript', 'icon' => 'fa-js', 'color' => '#f7df1e', 'isHardSkill' => true],
            ['name' => 'HTML', 'icon' => 'fa-html5', 'color' => '#e34f26', 'isHardSkill' => true],
            ['name' => 'CSS', 'icon' => 'fa-css3-alt', 'color' => '#1572b6', 'isHardSkill' => true],
            ['name' => 'Communication', 'icon' => 'fa-comments', 'color' => '#ff6347', 'isHardSkill' => false],
            ['name' => 'Teamwork', 'icon' => 'fa-users', 'color' => '#4682b4', 'isHardSkill' => false],
            ['name' => 'Problem Solving', 'icon' => 'fa-lightbulb', 'color' => '#32cd32', 'isHardSkill' => false],
            ['name' => 'Time Management', 'icon' => 'fa-clock', 'color' => '#ff4500', 'isHardSkill' => false],
            ['name' => 'Adaptability', 'icon' => 'fa-sync-alt', 'color' => '#1e90ff', 'isHardSkill' => false],
            ['name' => 'Creativity', 'icon' => 'fa-paint-brush', 'color' => '#ff69b4', 'isHardSkill' => false],
            ['name' => 'Work Ethic', 'icon' => 'fa-briefcase', 'color' => '#8b4513', 'isHardSkill' => false],
            ['name' => 'Critical Thinking', 'icon' => 'fa-brain', 'color' => '#6a5acd', 'isHardSkill' => false],
            ['name' => 'Leadership', 'icon' => 'fa-user-tie', 'color' => '#ffd700', 'isHardSkill' => false],
            ['name' => 'Python', 'icon' => 'fa-python', 'color' => '#306998', 'isHardSkill' => true],
            ['name' => 'Java', 'icon' => 'fa-java', 'color' => '#b07219', 'isHardSkill' => true],
            ['name' => 'C++', 'icon' => 'fa-cuttlefish', 'color' => '#00599c', 'isHardSkill' => true],
            ['name' => 'SQL', 'icon' => 'fa-database', 'color' => '#f29111', 'isHardSkill' => true],
        ];

        foreach ($skills as $skillData) {
            $this->addSkillIfNotExists($manager, $skillData['name'], $skillData['icon'], $skillData['color'], $skillData['isHardSkill']);
        }

        $manager->flush();
    }

    private function addSkillIfNotExists(ObjectManager $manager, string $name, string $icon, string $color, bool $isHardSkill): void
    {
        $skillRepository = $this->managerRegistry->getRepository(Skill::class);
        $existingSkill   = $skillRepository->findOneBy(['name' => $name]);

        if (!$existingSkill) {
            $skill = new Skill();
            $skill->setName($name)
                  ->setIcon($icon)
                  ->setColor($color)
                  ->setIsHardSkill($isHardSkill);

            $manager->persist($skill);
            $this->addReference($name, $skill);
        }
    }
}
