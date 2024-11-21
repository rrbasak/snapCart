

// class BloomFilter {
//   constructor(size, hasCount) {
//     this.bitarray = new Array(this.size).fill(0);
//     this.size = size;
//     this.hasCount = hasCount;
//   }
//   hash(value, seed) {
//     let hash = 0;
//     for (let i = 0; i < value.length; i++) {
//       hash = (hash * seed + value.charCodeAt(i)) % this.size;
//     }
//     return hash;
//   }

//   add(value){
//     for (let i = 0; i < this.hasCount; i++) {
//       const ind = this.hash(value, i);
//       this.bitarray[ind] = 1;
//     }
//   }
//   alreadyExists(value) {
//     console.log("value",value); 
//     console.log("hasCount", this.hasCount); 
//     console.log("size",this.size); 
//     for (let i = 0; i < this.hasCount; i++) {
//       const ind = this.hash(value, i);
//       console.log("ind", ind);
//       console.log("value", this.bitarray[ind]);
//       if(this.bitarray[ind] === 0){
//         console.log("return")
//         return false;
//       }
//     }
//     return true;
//   }
// }
// export default BloomFilter;

// class BloomFilter {
//   constructor(size, hasCount) {
//     this.size = size; // Size of the bit array
//     this.bitarray = new Array(this.size).fill(0); // Initialize bit array with all 0s
//     this.hasCount = hasCount; // Number of hash functions
//   }

//   hash(value, seed) {
//     let hash = 0;
//     for (let i = 0; i < value.length; i++) {
//       hash = (hash * seed + value.charCodeAt(i)) % this.size;
//     }
//     // Ensure the hash value stays within the bounds of the bit array size
//     return hash % this.size;
//   }

//   add(value) {
//     for (let i = 0; i < this.hasCount; i++) {
//       const ind = this.hash(value, i + 1); // Start seed from 1 to vary hash outputs
//       this.bitarray[ind] = 1;
//     }
//     console.log("bitarray", this.bitarray);
//   }

//   alreadyExists(value) {
//     console.log("value", value);
//     console.log("hasCount", this.hasCount);
//     console.log("size", this.size);
//     console.log("bitarray", this.bitarray);

//     for (let i = 0; i < this.hasCount; i++) {
//       const ind = this.hash(value, i + 1); // Start seed from 1 to vary hash outputs
//       console.log("ind", ind);
//       console.log("bitarray[ind]", this.bitarray[ind]); // Access the bitarray at the hashed index

//       // Check if the bit array at the index is 0, indicating the value is not likely in the filter
//       if (this.bitarray[ind] === 0) {
//         console.log("return false");
//         return false;
//       }
//     }
//     return true; 
//   }
// }

// export default BloomFilter;




// server/utils/BloomFilter.js
class BloomFilter {
  constructor(size, hashCount) {
    this.size = size;
    this.hashCount = hashCount;
    this.bitArray = new Array(size).fill(0);
  }

  hash(value, seed) {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = (hash * seed + value.charCodeAt(i)) % this.size;
    }
    return hash;
  }

  add(value) {
    for (let i = 1; i <= this.hashCount; i++) {
      const index = this.hash(value, i);
      this.bitArray[index] = 1;
    }
  }

  check(value) {
    for (let i = 1; i <= this.hashCount; i++) {
      const index = this.hash(value, i);
      if (this.bitArray[index] === 0) return false;
    }
    return true;
  }
}

export default BloomFilter;
