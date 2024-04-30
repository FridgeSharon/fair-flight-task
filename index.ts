// this is an AUX file

import { AxiosError } from "axios";
import LLBG from "./src/airports/LLBG";
import { DepartureBoard } from "./departureBoard";

const departureBoard = new DepartureBoard();
departureBoard.addAirport(LLBG);
console.log(departureBoard.supportedAirports());

// this fails because the airport is not supported
(async () => {
	try {
		const departures = await departureBoard.departuresFor("LGBTQ");
		console.log(departures);
	} catch (error) {
		const axiosError = error as AxiosError;
		console.error(axiosError.message);
	}
})();

// this works
(async () => {
	try {
		const departures = await departureBoard.departuresFor("LLBG");
		console.log(departures);
	} catch (error) {
		const axiosError = error as AxiosError;
		console.error(axiosError.message);
	}
})();
