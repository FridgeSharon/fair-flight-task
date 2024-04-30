import Departure from "../types/departure";

interface iAirport {
	name: string;
	code: string;
	Departures: Departure[];
	getDepartures(): Promise<Departure[]>;
}

export default iAirport;
