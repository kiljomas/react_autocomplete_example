export function getAnimalDetails(animal) {
  // this would call an external service to get animal details.
  // for the purpose of this example, this will just be hard coded.

  switch (animal) {
    case "Alligator":
      return {
        scientificName: "Alligator mississippiensis",
        conservationStatus: "Least Concern"
      };
    case "Little Brown Bat":
      return {
        scientificName: "Myotis lucifugus",
        conservationStatus: "Endangered"
      };
    case "Dog":
      return {
        scientificName: "Canis familiaris",
        conservationStatus: "Least Concern"
      };
    case "Bald Eagle": {
      return {
        scientificName: "Haliaeetus leucocephalus",
        conservationStatus: "Least Concern"
      };
    }
    case "Lion": {
      return {
        scientificName: "Panthera leo",
        conservationStatus: "Vulnerable"
      };
    }
    case "Red Panda": {
      return {
        scientificName: "Ailurus fulgens",
        conservationStatus: "Endangered"
      };
    }
    case "Wyoming Toad": {
      return {
        scientificName: "Anaxyrus baxteri",
        conservationStatus: "Extinct in the Wild"
      };
    }
    default:
      return undefined;
  }
}
