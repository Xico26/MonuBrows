const mongoose = require("mongoose");
const Monument = require("./models/monument");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/monubrows");
  console.log("Mongo is open!");
}

main().catch((err) => console.log(err));

const seedMonuments = [
  {
    name: "Belem Tower",
    price: 5.99,
    description: "Tower in Lisbon",
    city: "Lisbon", 
    country: "Portugal",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Torre_Bel%C3%A9m_April_2009-4a.jpg/1024px-Torre_Bel%C3%A9m_April_2009-4a.jpg"
      }
    ],
    author: "64e9db594985e10916373968",
  },
  {
    name: "Jeronimos Monastery",
    price: 5.99,
    description: "Monastery in Lisbon",
    city: "Lisbon", 
    country: "Portugal",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/The_Jer%C3%B3nimos_Monastery_or_Hieronymites_Monastery.png/1280px-The_Jer%C3%B3nimos_Monastery_or_Hieronymites_Monastery.png"
      }
    ],
    author: "64e9db594985e10916373968",
  },
  {
    name: "Padrão dos Descobrimentos",
    price: 5.99,
    description: "Descobrimentos go brr",
    city: "Lisbon", 
    country: "Portugal",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Lisboa_January_2015-49a.jpg/800px-Lisboa_January_2015-49a.jpg"
      }
    ],
    author: "64e9db594985e10916373968",
  },
  {
    name: "Torre dos Clérigos",
    price: 5.99,
    description: "Big boi",
    city: "Porto", 
    country: "Portugal",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Torre_de_los_Cl%C3%A9rigos%2C_Oporto%2C_Portugal%2C_2012-05-09%2C_DD_01.JPG/800px-Torre_de_los_Cl%C3%A9rigos%2C_Oporto%2C_Portugal%2C_2012-05-09%2C_DD_01.JPG"
      }
    ],
    author: "64e9db594985e10916373968",
  },
  {
    name: "Big Ben",
    price: 5.99,
    description: "Big Ben...",
    city: "London", 
    country: "United Kingdom",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Big_Ben_2022_%282%29.jpg/800px-Big_Ben_2022_%282%29.jpg"
      }
    ],
    author: "64e9db594985e10916373968",
  },
  {
    name: "Westminster Palace",
    price: 5.99,
    description: "ORDER",
    city: "London", 
    country: "United Kingdom",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Houses_of_Parliament_in_2022_%28cropped%29.jpg/1920px-Houses_of_Parliament_in_2022_%28cropped%29.jpg"
      }
    ],
    author: "64e9db594985e10916373968",
  },
  {
    name: "London Eye",
    price: 5.99,
    description: "Wow big wheel such wow",
    city: "London", 
    country: "United Kingdom",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/London-Eye-2009.JPG/1280px-London-Eye-2009.JPG"
      }
    ],
    author: "64e9db594985e10916373968",
  },
  {
    name: "Versailles",
    price: 5.99,
    description: "L'état, c'est moi",
    city: "Paris", 
    country: "France",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Versailles-Chateau-Jardins02.jpg/1280px-Versailles-Chateau-Jardins02.jpg"
      }
    ],
    author: "64e9db594985e10916373968",
  },
  {
    name: "Arc du Triomphe",
    price: 5.99,
    description: "Napoleon hon hon",
    city: "Paris", 
    country: "France",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Arc_de_Triomphe%2C_Paris_21_October_2010.jpg/1280px-Arc_de_Triomphe%2C_Paris_21_October_2010.jpg"
      }
    ],
    author: "64e9db594985e10916373968",
  },
  {
    name: "Eiffel Tower",
    price: 5.99,
    description: "Tour très grande baguette",
    city: "Paris", 
    country: "France",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg/800px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg"
      }
    ],
    author: "64e9db594985e10916373968",
  },
  {
    name: "Atomium",
    price: 5.99,
    description: "Quite big for an atom",
    city: "Brussels", 
    country: "Belgium",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Brussels_-_Atomium_2022.jpg/800px-Brussels_-_Atomium_2022.jpg"
      }
    ],
    author: "64e9db594985e10916373968",
  },
  {
    name: "Colosseum",
    price: 5.99,
    description: "FIGHT",
    city: "Rome", 
    country: "Italy",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/1280px-Colosseo_2020.jpg"
      }
    ],
    author: "64e9db594985e10916373968",
  },
  {
    name: "St. Peter's Basilica",
    price: 5.99,
    description: "OH FELIX ROMA",
    city: "Vatican City", 
    country: "Vatican City",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Basilica_di_San_Pietro_in_Vaticano_September_2015-1a.jpg/1920px-Basilica_di_San_Pietro_in_Vaticano_September_2015-1a.jpg"
      }
    ],
    author: "64e9db594985e10916373968",
  },
  {
    name: "Tower of Pisa",
    price: 5.99,
    description: "Completely normal tower in Pisa...",
    city: "Pisa", 
    country: "Italy",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Italy_-_Pisa_-_Leaning_Tower.jpg/800px-Italy_-_Pisa_-_Leaning_Tower.jpg"
      }
    ],
    author: "64e9db594985e10916373968",
  },
  {
    name: "Parthenon",
    price: 5.99,
    description: "Greek Temple",
    city: "Athens", 
    country: "Greece",
    images: [
      {
        url: "https://images.unsplash.com/photo-1555993539-1732b0258235?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      }
    ],
    author: "64e9db594985e10916373968",
  },
];

const seedDB = async() => {
    await Monument.deleteMany({})
    await Monument.insertMany(seedMonuments)
}

seedDB()  