import axios from "axios";
import iAirport from "../interfaces/airport";
import Departure from "../types/departure";
import { iLLBGflight } from "../interfaces/flights";

class LLBG implements iAirport {
	name: string = "Ben Gurion Airport";
	code: string = "LLBG";
	Departures: Departure[] = [];

	async getDepartures(): Promise<Departure[]> {
		const response = await axios({
			method: "post",
			url: "https://www.iaa.gov.il/umbraco/surface/FlightBoardSurface/Search",
			headers: {
				"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
			},
			data: "FlightType=Outgoing&AirportId=LLBG&UICulture=en-US",
		});

		const mappedFlights: Departure[] = response.data.Flights.map(
			(flight: iLLBGflight) => ({
				airline: flight.Airline,
				destinationCity: flight.City,
				flightCode: flight.Flight,
				scheduleDate: flight.ScheduledDate,
				scheduleTime: flight.ScheduledTime,
				updateDate: flight.UpdatedDate,
				updateTime: flight.UpdatedTime,
			})
		);

		return mappedFlights;
	}
}

export default new LLBG();

/*
returned Flight object:
{
    CheckInUrl: "",
    Counter: "46-55",
    Airline: "ARKIA  ISRAELI  AIRLINES",
    Flight: "IZ 161",
    Terminal: "3",
    Status: "CANCELED",
    City: "LARNACA",
    Country: null,
    StatusColor: "none",
    ScheduledDateTime: "/Date(1714485600000)/",
    ScheduledDate: "30/04",
    ScheduledTime: "14:00",
    UpdatedDateTime: "/Date(1714485600000)/",
    UpdatedDate: "30/04",
    UpdatedTime: "14:00",
    CurrentCultureName: "en-US",
  }
  */
