<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\User\UserInterface;

#[Route('/auth')]
class AuthController extends AbstractController
{
    #[Route('/login', name: 'app_auth_login', methods: ['POST'])]
    public function login(UserInterface $user): JsonResponse
    {
        $response = new JsonResponse([
            'user'  => $user->getUserIdentifier(),
            'roles' => $user->getRoles(),
            'code'  => JsonResponse::HTTP_OK,
        ], JsonResponse::HTTP_OK);

        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'POST, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        return $response;
    }
}
