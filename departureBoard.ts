import iAirport from "./src/interfaces/airport";
import iDepartureBoards from "./src/interfaces/departureBoard";
import Departure from "./src/types/departure";

export class DepartureBoard implements iDepartureBoards {
	private _supportedAirports: Map<string, iAirport>;

	constructor() {
		this._supportedAirports = new Map();
	}

	public supportedAirports(): string[] {
		return Array.from(this._supportedAirports.keys());
	}

	public addAirport(airport: iAirport): void {
		this._supportedAirports.set(airport.code, airport);
	}

	public removeAirportByCode(airportCode: string): void {
		this._supportedAirports.delete(airportCode);
	}

	public departuresFor(airport: string): Promise<Departure[]> {
		const _airport = this._supportedAirports.get(airport);
		if (_airport) {
			return _airport.getDepartures();
		}
		throw new Error(`Airport ${airport} is not supported`);
	}
}
