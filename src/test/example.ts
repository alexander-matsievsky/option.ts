import {Option} from "../main/lib";

const data:{
    name?:{
        first?:string
        last?:string
    },
    age?:number
    address?:{
        country?:{
            name?:string
            city?:{
                name?:string
                street?:string
            }
        }
    }
}[] = [{
    age: 57,
    address: {
        country: {
            name: "Australia",
            city: {
                street: "92 Walter Crescent"
            }
        }
    }
}, {
    name: {first: "Raul"},
    address: {
        country: {
            name: "Australia",
            city: {
                name: "WANDEARAH EAST SA 5523",
                street: "43 Gadd Avenue"
            }
        }
    }
}, {
    name: {first: "Jason", last: "Giordano"},
    age: 42,
    address: {
        country: {
            name: "Australia",
            city: {
                name: "BARDEN RIDGE NSW 2234",
            }
        }
    }
}, {
    name: {first: "Emily", last: "Meade"},
    age: 76,
    address: {
        country: {
            city: {
                name: "BARUNGA GAP SA 5520",
                street: "42 Gadd Avenue"
            }
        }
    }
}, {
    age: 27,
    address: {
        country: {
            name: "Australia",
            city: {
                street: "41 Duff Street"
            }
        }
    }
}, {
    name: {last: "Sparks"},
    age: 21,
    address: {
        country: {
            name: "Australia",
            city: {
                name: "WARRNAMBOOL WEST VIC 3280",
                street: "61 Walpole Avenue"
            }
        }
    }
}, {
    name: {first: "Frieda", last: "McLendon"},
    age: 68,
    address: {
        country: {
            city: {
                name: "LIMA SOUTH VIC 3673",
                street: "8 Walters Street"
            }
        }
    }
}, {
    name: {first: "Maria", last: "Hampton"},
    address: {
        country: {
            name: "Australia",
            city: {
                street: "5 Delan Road"
            }
        }
    }
}, {
    name: {first: "Jerry"},
    age: 52,
    address: {
        country: {
            name: null,
            city: {
                name: "ARMADALE NORTH VIC 3143",
                street: "38 Patton Street"
            }
        }
    }
}, {
    name: {},
    address: {
        country: {
            name: "Australia",
            city: {
                name: "MAY DOWNS QLD 4746",
            }
        }
    }
}];

let compose =
        <A, B, C>(f:(b:B) => C, g:(a:A) => B) => (a:A):C =>
            f(g(a)),
    search =
        (query:string[]):string => {
            let search =
                    query.reduce((g, key) => {
                        return compose(o => o.flatMap((data:{[key:string]:Object}) => Option(data[key])), g);
                    }, Option),
                found =
                    data.map(search);
            return `
query: ${query.join(".")}
found:\n
${found.map((_, i) => ` -- ${i}: ${_}`).join("\n")}
`;
        };

console.log(search(["name", "last"]));
console.log(search(["address", "country", "city", "name"]));
console.log(search(["address", "country", "city", "street"]));
