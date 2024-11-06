<?php

declare(strict_types=1);

namespace App\DataFixtures;

use App\Entity\Project;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class ProjectsFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $projects = [
            [
                'name'        => 'E-commerce Platform',
                'color'       => '#ff0000',
                'subtitle'    => 'Online Shopping Made Easy',
                'description' => 'A comprehensive e-commerce platform with a user-friendly interface and secure payment gateway.',
                'isPersonal'  => false,
                'link'        => 'https://ecommerce.com',
                'skills'      => ['Symfony', 'Vue.js', 'PHP', 'JavaScript', 'Communication'],
            ],
            [
                'name'        => 'Social Media App',
                'color'       => '#00ff00',
                'subtitle'    => 'Connect with Friends',
                'description' => 'A social media application to connect with friends and share updates.',
                'isPersonal'  => true,
                'link'        => 'https://socialmedia.com',
                'skills'      => ['React', 'HTML', 'CSS', 'Teamwork', 'Problem Solving'],
            ],
            [
                'name'        => 'Project Management Tool',
                'color'       => '#0000ff',
                'subtitle'    => 'Manage Your Projects Efficiently',
                'description' => 'A tool to manage projects, assign tasks, and track progress.',
                'isPersonal'  => false,
                'link'        => 'https://projectmanagement.com',
                'skills'      => ['JavaScript', 'PHP', 'SQL', 'Time Management', 'Adaptability'],
            ],
            [
                'name'        => 'Portfolio Website',
                'color'       => '#ffff00',
                'subtitle'    => 'Showcase Your Work',
                'description' => 'A personal portfolio website to showcase your projects and skills.',
                'isPersonal'  => true,
                'link'        => 'https://portfolio.com',
                'skills'      => ['HTML', 'CSS', 'JavaScript', 'Creativity', 'Work Ethic'],
            ],
            [
                'name'        => 'Blog Platform',
                'color'       => '#ff00ff',
                'subtitle'    => 'Share Your Thoughts',
                'description' => 'A blogging platform to share your thoughts and ideas with the world.',
                'isPersonal'  => false,
                'link'        => 'https://blogplatform.com',
                'skills'      => ['Symfony', 'PHP', 'JavaScript', 'Critical Thinking', 'Leadership'],
            ],
            [
                'name'        => 'Online Learning Platform',
                'color'       => '#00ffff',
                'subtitle'    => 'Learn New Skills',
                'description' => 'An online platform to learn new skills through video tutorials and quizzes.',
                'isPersonal'  => true,
                'link'        => 'https://onlinelearning.com',
                'skills'      => ['Python', 'Java', 'C++', 'SQL', 'Communication'],
            ],
            [
                'name'        => 'Fitness Tracker App',
                'color'       => '#ff6347',
                'subtitle'    => 'Track Your Fitness Goals',
                'description' => 'An app to track your fitness goals and monitor your progress.',
                'isPersonal'  => false,
                'link'        => 'https://fitnesstracker.com',
                'skills'      => ['React', 'JavaScript', 'HTML', 'CSS', 'Teamwork'],
            ],
            [
                'name'        => 'Recipe Sharing Platform',
                'color'       => '#4682b4',
                'subtitle'    => 'Share and Discover Recipes',
                'description' => 'A platform to share and discover new recipes from around the world.',
                'isPersonal'  => true,
                'link'        => 'https://recipes.com',
                'skills'      => ['Vue.js', 'PHP', 'JavaScript', 'Creativity', 'Problem Solving'],
            ],
            [
                'name'        => 'Travel Booking Website',
                'color'       => '#32cd32',
                'subtitle'    => 'Book Your Next Adventure',
                'description' => 'A website to book flights, hotels, and rental cars for your next adventure.',
                'isPersonal'  => false,
                'link'        => 'https://travelbooking.com',
                'skills'      => ['Symfony', 'JavaScript', 'HTML', 'CSS', 'Communication'],
            ],
            [
                'name'        => 'Job Portal',
                'color'       => '#ff4500',
                'subtitle'    => 'Find Your Dream Job',
                'description' => 'A job portal to find and apply for your dream job.',
                'isPersonal'  => true,
                'link'        => 'https://jobportal.com',
                'skills'      => ['PHP', 'SQL', 'JavaScript', 'Teamwork', 'Leadership'],
            ],
        ];

        foreach ($projects as $projectData) {
            $this->addProject($manager, $projectData);
        }

        $manager->flush();
    }

    private function addProject(ObjectManager $manager, array $projectData): void
    {
        $project = new Project();
        $project->setName($projectData['name'])
                ->setColor($projectData['color'])
                ->setSubtitle($projectData['subtitle'])
                ->setDescription($projectData['description'])
                ->setIsPersonal($projectData['isPersonal'])
                ->setLink($projectData['link']);

        foreach ($projectData['skills'] as $skillName) {
            $skill = $this->getReference($skillName);
            $project->addSkill($skill);
            $skill->addProject($project);
        }

        $manager->persist($project);
    }

    public function getDependencies()
    {
        return [
            SkillsFixtures::class,
        ];
    }
}
