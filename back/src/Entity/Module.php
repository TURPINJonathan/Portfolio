<?php

declare(strict_types=1);

namespace App\Entity;

use App\Repository\ModuleRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ModuleRepository::class)]
class Module
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['module:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255, unique: true, type: 'string')]
    #[Assert\NotBlank]
    #[Groups(['module:read', 'module:write'])]
    private ?string $name = null;

    #[ORM\Column(length: 50, type: 'string')]
    #[Assert\NotBlank]
    #[Groups(['module:read', 'module:write'])]
    private ?string $icon = null;

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
}
