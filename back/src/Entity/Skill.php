<?php

declare(strict_types=1);

namespace App\Entity;

use App\Repository\SkillRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: SkillRepository::class)]
class Skill
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(length: 255, unique: true, type: 'string')]
    #[Assert\NotBlank]
    #[Groups(['skill:read', 'skill:write'])]
    private ?string $name = null;

    #[ORM\Column(length: 255, type: 'string')]
    #[Assert\NotBlank]
    #[Groups(['skill:read', 'skill:write'])]
    private ?string $icon = null;

    #[ORM\Column(length: 255, type: 'string')]
    #[Assert\NotBlank]
    #[Assert\Regex(pattern: '/^#/')]
    #[Groups(['skill:read', 'skill:write'])]
    private ?string $color = null;

    #[ORM\Column(nullable: true, type: 'boolean')]
    #[Groups(['skill:read', 'skill:write'])]
    private ?bool $isHardSkill = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getIcon(): ?string
    {
        return $this->icon;
    }

    public function setIcon(string $icon): static
    {
        $this->icon = $icon;

        return $this;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(string $color): static
    {
        $this->color = $color;

        return $this;
    }

    public function isIsHardSkill(): ?bool
    {
        return $this->isHardSkill;
    }

    public function setIsHardSkill(bool $isHardSkill): static
    {
        $this->isHardSkill = $isHardSkill;

        return $this;
    }
}
