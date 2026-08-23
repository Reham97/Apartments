import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Checking database...");

  const count = await prisma.apartment.count();

  if (count > 0) {
    console.log("Apartments already exist. Skipping seed.");
    return;
  }

  console.log("Seeding 9 apartments...");

  await prisma.apartment.createMany({
    data: [
      {
        title: "Modern Apartment in Maadi",
        description:
          "A spacious modern apartment with excellent natural light, stylish interiors, and a prime location close to restaurants, cafes, and essential services.",
        address: "Street 9",
        city: "Maadi, Cairo",
        price: 25000,
        bedrooms: 2,
        bathrooms: 1,
        area: 120,
        images: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
        ],
        isVerified: true,
        contactPhone: "+201234567890",
      },
      {
        title: "Luxury Apartment in Zamalek",
        description:
          "An elegant apartment with premium finishing, spacious rooms, and a beautiful atmosphere in one of Cairo's most desirable neighborhoods.",
        address: "Abou El Feda Street",
        city: "Zamalek, Cairo",
        price: 45000,
        bedrooms: 3,
        bathrooms: 2,
        area: 180,
        images: [
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
          "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
        ],
        isVerified: true,
        contactPhone: "+201234567891",
      },
      {
        title: "Cozy Studio in New Cairo",
        description:
          "A comfortable and fully designed studio in a quiet neighborhood, ideal for an individual or couple looking for convenience and privacy.",
        address: "Fifth Settlement",
        city: "New Cairo",
        price: 12000,
        bedrooms: 1,
        bathrooms: 1,
        area: 65,
        images: [
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
          "https://images.unsplash.com/photo-1493666438817-866a91353ca9",
        ],
        isVerified: true,
        contactPhone: "+201234567892",
      },
      {
        title: "Spacious Family Apartment in Sheikh Zayed",
        description:
          "A large family apartment offering generous living spaces, multiple bedrooms, and a peaceful residential environment.",
        address: "Beverly Hills",
        city: "Sheikh Zayed",
        price: 35000,
        bedrooms: 4,
        bathrooms: 3,
        area: 220,
        images: [
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
          "https://images.unsplash.com/photo-1600573472592-401b489a3cdc",
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
        ],
        isVerified: true,
        contactPhone: "+201234567893",
      },
      {
        title: "Sunny Apartment in Heliopolis",
        description:
          "A bright and welcoming apartment with large windows, comfortable rooms, and easy access to shopping, schools, and transportation.",
        address: "El Merghany Street",
        city: "Heliopolis, Cairo",
        price: 22000,
        bedrooms: 2,
        bathrooms: 2,
        area: 140,
        images: [
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
          "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace",
        ],
        isVerified: true,
        contactPhone: "+201234567894",
      },
      {
        title: "Premium Apartment in 6th of October",
        description:
          "A premium apartment in a modern residential community with high-quality finishes, spacious interiors, and a secure environment.",
        address: "Al Mehwar Al Markazi",
        city: "6th of October",
        price: 30000,
        bedrooms: 3,
        bathrooms: 2,
        area: 165,
        images: [
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
          "https://images.unsplash.com/photo-1600607688969-a5bfcd646154",
          "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87",
        ],
        isVerified: true,
        contactPhone: "+201234567895",
      },
      {
        title: "Contemporary Apartment in Nasr City",
        description:
          "A contemporary apartment designed for comfortable everyday living with practical spaces and excellent access to major roads.",
        address: "Makram Ebeid Street",
        city: "Nasr City, Cairo",
        price: 18000,
        bedrooms: 2,
        bathrooms: 1,
        area: 110,
        images: [
          "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099",
          "https://images.unsplash.com/photo-1615874694520-474822394e73",
          "https://images.unsplash.com/photo-1616046229478-9901c5536a45",
        ],
        isVerified: true,
        contactPhone: "+201234567896",
      },
      {
        title: "Elegant Apartment in Garden City",
        description:
          "An elegant apartment in the heart of Cairo featuring refined interiors, spacious living areas, and a prestigious central location.",
        address: "Kasr El Ainy Street",
        city: "Garden City, Cairo",
        price: 40000,
        bedrooms: 3,
        bathrooms: 2,
        area: 190,
        images: [
          "https://images.unsplash.com/photo-1600607688960-e095ff83135c",
          "https://images.unsplash.com/photo-1600607688963-ee1c7d44d5f9",
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
        ],
        isVerified: true,
        contactPhone: "+201234567897",
      },
      {
        title: "Modern Apartment in Mohandessin",
        description:
          "A stylish modern apartment with a practical layout, excellent natural light, and a convenient location near restaurants and shopping areas.",
        address: "Syria Street",
        city: "Mohandessin, Giza",
        price: 28000,
        bedrooms: 3,
        bathrooms: 2,
        area: 155,
        images: [
          "https://images.unsplash.com/photo-1600607687644-c7171b42498b",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
          "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90",
        ],
        isVerified: true,
        contactPhone: "+201234567898",
      },
    ],
  });

  console.log("✅ 9 dummy apartments created successfully.");
}

main()
  .catch((error) => {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });