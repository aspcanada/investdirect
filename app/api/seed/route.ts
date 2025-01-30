import { auth } from "@clerk/nextjs/server";
import { db } from "app/db";
import { dealsTable } from "app/db/schema/deals";
import { products } from "app/db/schema/products";
import { v4 as uuidv4 } from 'uuid';

// export const dynamic = 'force-dynamic';

// alain@alainstpierre.com
const userId = 'user_2qM57upLSjmA501TIimkMR93lBN';

export async function GET() {
  const user = await auth();

  // only allow alain@alainstpierre.com to seed data
  if (user?.userId !== userId) {
    return Response.json({
      message: 'Unauthorized'
    });
  }
  console.log('process.env.NEXT_PUBLIC_CLERK_ENVIRONMENT', process.env.NEXT_PUBLIC_CLERK_ENVIRONMENT);

  // dont seed in production
  if (process.env.NEXT_PUBLIC_CLERK_ENVIRONMENT == 'production') {
    return Response.json({
      message: 'Unauthorized'
    });
  }

  // await seedProducts();
  await seedDeals();

  return Response.json({
    message: 'Done!'
  });

  
}

const seedDeals = async () => {
  await db.insert(dealsTable).values([
    {
      id: uuidv4(),
      userId: userId,
      dealName: 'Deal 1',
      description: 'Deal 1 description',
      financials: {
        value: 100000,
        repairCosts: 10000,
        amountNeeded: 90000,
        interestRate: 0.05,
        loanTerm: 10
      },
      propertyDetails: {
        propertyType: 'Residential',
        address: {
          street: '123 Main St',
          city: 'Vancouver',
          province: 'BC',
          postalCode: 'V6B 1A1'
        },
        bedrooms: 3,
        bathrooms: 2,
        year: 2000,
        buildingSf: 2000,
        lotSizeSf: 4000
      },
      images: [],
      documents: []
    },
    {
      id: uuidv4(),
      userId: userId,
      dealName: 'Downtown Commercial Space',
      description: 'Prime retail location in downtown business district',
      financials: {
        value: 750000,
        repairCosts: 50000,
        amountNeeded: 600000,
        interestRate: 0.07,
        loanTerm: 36
      },
      propertyDetails: {
        propertyType: 'Commercial',
        address: {
          street: '456 Business Ave',
          city: 'Victoria',
          province: 'BC',
          postalCode: 'V8W 1A1'
        },
        bedrooms: 0,
        bathrooms: 2,
        year: 1995,
        buildingSf: 3000,
        lotSizeSf: 3000
      },
      images: [],
      documents: []
    },
    {
      id: uuidv4(),
      userId: userId,
      dealName: 'Waterfront Duplex',
      description: 'Beautiful waterfront property with two separate units',
      financials: {
        value: 1200000,
        repairCosts: 75000,
        amountNeeded: 900000,
        interestRate: 0.065,
        loanTerm: 24
      },
      propertyDetails: {
        propertyType: 'Multi-Family',
        address: {
          street: '789 Ocean View Dr',
          city: 'Nanaimo',
          province: 'BC',
          postalCode: 'V9R 5K9'
        },
        bedrooms: 6,
        bathrooms: 4,
        year: 2005,
        buildingSf: 3200,
        lotSizeSf: 6000
      },
      images: [],
      documents: []
    },
    {
      id: uuidv4(),
      userId: userId,
      dealName: 'Mountain View Cottage',
      description: 'Cozy cottage with stunning mountain views',
      financials: {
        value: 450000,
        repairCosts: 35000,
        amountNeeded: 350000,
        interestRate: 0.06,
        loanTerm: 18
      },
      propertyDetails: {
        propertyType: 'Residential',
        address: {
          street: '321 Mountain Rd',
          city: 'Whistler',
          province: 'BC',
          postalCode: 'V0N 1B2'
        },
        bedrooms: 2,
        bathrooms: 1,
        year: 1985,
        buildingSf: 1200,
        lotSizeSf: 4000
      },
      images: [],
      documents: []
    },
    {
      id: uuidv4(),
      userId: userId,
      dealName: 'Industrial Warehouse',
      description: 'Large industrial space with excellent highway access',
      financials: {
        value: 2000000,
        repairCosts: 150000,
        amountNeeded: 1500000,
        interestRate: 0.075,
        loanTerm: 48
      },
      propertyDetails: {
        propertyType: 'Industrial',
        address: {
          street: '100 Industry Way',
          city: 'Richmond',
          province: 'BC',
          postalCode: 'V6X 1X8'
        },
        bedrooms: 0,
        bathrooms: 4,
        year: 2000,
        buildingSf: 15000,
        lotSizeSf: 25000
      },
      images: [],
      documents: []
    },
    {
      id: uuidv4(),
      userId: userId,
      dealName: 'Downtown Condo Development',
      description: 'Pre-construction condo development opportunity',
      financials: {
        value: 5000000,
        repairCosts: 3000000,
        amountNeeded: 4000000,
        interestRate: 0.085,
        loanTerm: 36
      },
      propertyDetails: {
        propertyType: 'Development',
        address: {
          street: '555 City Center Blvd',
          city: 'Vancouver',
          province: 'BC',
          postalCode: 'V6B 2L9'
        },
        bedrooms: 0,
        bathrooms: 0,
        year: 2024,
        buildingSf: 50000,
        lotSizeSf: 10000
      },
      images: [],
      documents: []
    },
    {
      id: uuidv4(),
      userId: userId,
      dealName: 'Heritage House Renovation',
      description: 'Historic property ready for modern updates',
      financials: {
        value: 850000,
        repairCosts: 200000,
        amountNeeded: 700000,
        interestRate: 0.069,
        loanTerm: 24
      },
      propertyDetails: {
        propertyType: 'Residential',
        address: {
          street: '234 Heritage Lane',
          city: 'Victoria',
          province: 'BC',
          postalCode: 'V8V 2L5'
        },
        bedrooms: 5,
        bathrooms: 3,
        year: 1912,
        buildingSf: 3500,
        lotSizeSf: 8000
      },
      images: [],
      documents: []
    },
    {
      id: uuidv4(),
      userId: userId,
      dealName: 'Retail Strip Mall',
      description: 'Fully leased retail complex with stable tenants',
      financials: {
        value: 3500000,
        repairCosts: 250000,
        amountNeeded: 2500000,
        interestRate: 0.072,
        loanTerm: 60
      },
      propertyDetails: {
        propertyType: 'Commercial',
        address: {
          street: '789 Market Street',
          city: 'Burnaby',
          province: 'BC',
          postalCode: 'V5H 2M9'
        },
        bedrooms: 0,
        bathrooms: 6,
        year: 1998,
        buildingSf: 12000,
        lotSizeSf: 30000
      },
      images: [],
      documents: []
    },
    {
      id: uuidv4(),
      userId: userId,
      dealName: 'Lakefront Resort Property',
      description: 'Seasonal resort with expansion potential',
      financials: {
        value: 4200000,
        repairCosts: 500000,
        amountNeeded: 3500000,
        interestRate: 0.077,
        loanTerm: 48
      },
      propertyDetails: {
        propertyType: 'Commercial',
        address: {
          street: '1001 Lake Resort Dr',
          city: 'Kelowna',
          province: 'BC',
          postalCode: 'V1Y 9P1'
        },
        bedrooms: 20,
        bathrooms: 22,
        year: 1990,
        buildingSf: 25000,
        lotSizeSf: 100000
      },
      images: [],
      documents: []
    },
    {
      id: uuidv4(),
      userId: userId,
      dealName: 'Student Housing Complex',
      description: 'Multi-unit property near major university',
      financials: {
        value: 2800000,
        repairCosts: 200000,
        amountNeeded: 2000000,
        interestRate: 0.068,
        loanTerm: 36
      },
      propertyDetails: {
        propertyType: 'Multi-Family',
        address: {
          street: '333 University Way',
          city: 'Vancouver',
          province: 'BC',
          postalCode: 'V6T 1Z4'
        },
        bedrooms: 12,
        bathrooms: 8,
        year: 2010,
        buildingSf: 8000,
        lotSizeSf: 12000
      },
      images: [],
      documents: []
    }
  ]);
};

const seedProducts = async () => {
  await db.insert(products).values([
    {
      id: 1,
      imageUrl:
        'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/smartphone-gaPvyZW6aww0IhD3dOpaU6gBGILtcJ.webp',
      name: 'Smartphone X Pro',
      status: 'active',
      price: '999.00',
      stock: 150,
      availableAt: new Date()
    },
    {
      id: 2,
      imageUrl:
        'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/earbuds-3rew4JGdIK81KNlR8Edr8NBBhFTOtX.webp',
      name: 'Wireless Earbuds Ultra',
      status: 'active',
      price: '199.00',
      stock: 300,
      availableAt: new Date()
    },
    {
      id: 3,
      imageUrl:
        'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/home-iTeNnmKSMnrykOS9IYyJvnLFgap7Vw.webp',
      name: 'Smart Home Hub',
      status: 'active',
      price: '149.00',
      stock: 200,
      availableAt: new Date()
    },
    {
      id: 4,
      imageUrl:
        'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/tv-H4l26crxtm9EQHLWc0ddrsXZ0V0Ofw.webp',
      name: '4K Ultra HD Smart TV',
      status: 'active',
      price: '799.00',
      stock: 50,
      availableAt: new Date()
    },
    {
      id: 5,
      imageUrl:
        'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/laptop-9bgUhjY491hkxiMDeSgqb9R5I3lHNL.webp',
      name: 'Gaming Laptop Pro',
      status: 'active',
      price: '1299.00',
      stock: 75,
      availableAt: new Date()
    },
    {
      id: 6,
      imageUrl:
        'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/headset-lYnRnpjDbZkB78lS7nnqEJFYFAUDg6.webp',
      name: 'VR Headset Plus',
      status: 'active',
      price: '349.00',
      stock: 120,
      availableAt: new Date()
    },
    {
      id: 7,
      imageUrl:
        'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/watch-S2VeARK6sEM9QFg4yNQNjHFaHc3sXv.webp',
      name: 'Smartwatch Elite',
      status: 'active',
      price: '249.00',
      stock: 250,
      availableAt: new Date()
    },
    {
      id: 8,
      imageUrl:
        'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/speaker-4Zk0Ctx5AvxnwNNTFWVK4Gtpru4YEf.webp',
      name: 'Bluetooth Speaker Max',
      status: 'active',
      price: '99.00',
      stock: 400,
      availableAt: new Date()
    },
    {
      id: 9,
      imageUrl:
        'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/charger-GzRr0NSkCj0ZYWkTMvxXGZQu47w9r5.webp',
      name: 'Portable Charger Super',
      status: 'active',
      price: '59.00',
      stock: 500,
      availableAt: new Date()
    },
    {
      id: 10,
      imageUrl:
        'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/thermostat-8GnK2LDE3lZAjUVtiBk61RrSuqSTF7.webp',
      name: 'Smart Thermostat Pro',
      status: 'active',
      price: '199.00',
      stock: 175,
      availableAt: new Date()
    }
  ]);
}