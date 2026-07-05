import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
  const menuDataPath = path.join(__dirname, '../content/menu.json')
  const menuData = JSON.parse(fs.readFileSync(menuDataPath, 'utf8'))

  console.log('Seeding menu data...')
  
  for (let i = 0; i < menuData.categories.length; i++) {
    const category = menuData.categories[i]
    const createdCategory = await prisma.menuCategory.create({
      data: {
        id: category.id,
        title: category.title,
        order: i,
      }
    })
    
    for (const item of category.items) {
      await prisma.menuItem.create({
        data: {
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          image: item.image,
          tags: item.tags,
          categoryId: createdCategory.id,
          isAvailable: true,
          orderable: item.orderable !== false
        }
      })
    }
  }

  // Create an admin user
  const bcrypt = require('bcryptjs')
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  await prisma.user.upsert({
    where: { email: 'admin@sindhu.com' },
    update: {},
    create: {
      email: 'admin@sindhu.com',
      password: hashedPassword,
      name: 'Sindhu Admin',
      role: 'ADMIN'
    }
  })

  // Create a default system setting for online status
  await prisma.systemSetting.upsert({
    where: { key: 'is_online' },
    update: {},
    create: {
      key: 'is_online',
      value: 'true'
    }
  })

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
