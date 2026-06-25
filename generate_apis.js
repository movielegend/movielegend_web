const fs = require('fs');
const path = require('path');

const modules = [
  { name: 'products', model: 'product' },
  { name: 'categories', model: 'category' },
  { name: 'brands', model: 'brand' },
  { name: 'customers', model: 'customer' },
  { name: 'orders', model: 'order' },
  { name: 'warranty-registrations', model: 'warrantyRegistration' },
  { name: 'news', model: 'news' },
  { name: 'banners', model: 'banner' },
  { name: 'settings', model: 'setting' },
];

const basePath = 'c:/webml/app/api';

modules.forEach(m => {
  const dirPath = path.join(basePath, m.name);
  const idPath = path.join(dirPath, '[id]');
  fs.mkdirSync(idPath, { recursive: true });

  const routeContent = `import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const data = await prisma.${m.model}.findMany();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch ${m.name}' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await prisma.${m.model}.create({ data: body });
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create ${m.name}' }, { status: 500 });
  }
}
`;
  fs.writeFileSync(path.join(dirPath, 'route.ts'), routeContent);

  const idRouteContent = `import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const data = await prisma.${m.model}.findUnique({ where: { id: Number(resolvedParams.id) } });
    if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch ${m.model}' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const body = await request.json();
    const data = await prisma.${m.model}.update({
      where: { id: Number(resolvedParams.id) },
      data: body,
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update ${m.model}' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    await prisma.${m.model}.delete({ where: { id: Number(resolvedParams.id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete ${m.model}' }, { status: 500 });
  }
}
`;
  fs.writeFileSync(path.join(idPath, 'route.ts'), idRouteContent);
});

// Auth routes
const authDirs = ['login', 'logout', 'refresh-token'];
authDirs.forEach(d => fs.mkdirSync(path.join(basePath, 'auth', d), { recursive: true }));

fs.writeFileSync(path.join(basePath, 'auth', 'login', 'route.ts'), `import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const user = await prisma.user.findUnique({ where: { email } });
    
    // NOTE: In a real application, use bcrypt.compare to verify the password hash
    if (!user || user.passwordHash !== password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    return NextResponse.json({ token: 'fake-jwt-token', user: { id: user.id, email: user.email, roleId: user.roleId } });
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
`);

fs.writeFileSync(path.join(basePath, 'auth', 'logout', 'route.ts'), `import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ success: true, message: 'Logged out' });
}
`);

fs.writeFileSync(path.join(basePath, 'auth', 'refresh-token', 'route.ts'), `import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();
    const refreshToken = await prisma.refreshToken.findUnique({ where: { token } });
    
    if (!refreshToken || refreshToken.expiresAt < new Date()) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }
    
    return NextResponse.json({ token: 'new-fake-jwt-token' });
  } catch (error) {
    return NextResponse.json({ error: 'Refresh failed' }, { status: 500 });
  }
}
`);

console.log("API generation complete.");
