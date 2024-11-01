<?php

declare(strict_types=1);
use PHPUnit\Framework\TestCase;
use PHPUnit\Metadata\Test;

#[Test(
    description: 'SimpleTest',
    covers: SimpleTest::class
)]
class SimpleTest extends TestCase
{
    public function testAddition()
    {
        $this->assertSame(4, 2 + 2);
    }

    public function testSubtraction()
    {
        $this->assertSame(0, 2 - 2);
    }

    public function testMultiplication()
    {
        $this->assertSame(9, 3 * 3);
    }

    public function testDivision()
    {
        $this->assertSame(2, 4 / 2);
    }
}
