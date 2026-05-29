<?php

namespace Tests\Unit;

use App\Models\User;
use PHPUnit\Framework\TestCase;

class UserTest extends TestCase
{
    public function test_user_with_admin_role_is_admin(): void
    {
        $user = new User(['role' => 'admin']);

        $this->assertTrue($user->isAdmin());
    }

    public function test_user_with_non_admin_role_is_not_admin(): void
    {
        $user = new User(['role' => 'user']);

        $this->assertFalse($user->isAdmin());
    }

    public function test_user_with_no_role_is_not_admin(): void
    {
        $user = new User();

        $this->assertFalse($user->isAdmin());
    }
}
