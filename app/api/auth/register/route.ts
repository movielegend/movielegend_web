import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword, signJWT } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { name, email, password, phone } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Họ tên, Email và Mật khẩu là bắt buộc' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Email này đã được sử dụng' }, { status: 400 });
    }

    // Get or default to 'Customer' role
    let customerRole = await prisma.role.findUnique({ where: { name: 'Customer' } });
    if (!customerRole) {
      customerRole = await prisma.role.create({ data: { name: 'Customer' } });
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        passwordHash,
        roleId: customerRole.id,
        customer: {
          create: {
            fullName: name,
            phone: phone || '',
            email: email
          }
        }
      },
      include: { role: true }
    });

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      roleId: user.roleId,
      role: user.role?.name || 'Customer'
    };

    const token = signJWT(payload);

    const response = NextResponse.json({
      success: true,
      token,
      user: payload
    }, { status: 201 });

    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
      sameSite: 'lax'
    });

    return response;
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Đăng ký thất bại' }, { status: 500 });
  }
}
