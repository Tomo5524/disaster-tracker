import { useEffect, useState } from "react";
import Loader from "./components/loader";
import Map from "./components/map";

const App = () => {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://eonet.sci.gsfc.nasa.gov/api/v2.1/events"
        );
        const { events } = await res.json();
        setEventData(events);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return <div>{!loading ? <Map eventData={eventData} /> : <Loader />}</div>;
};

export default App;
