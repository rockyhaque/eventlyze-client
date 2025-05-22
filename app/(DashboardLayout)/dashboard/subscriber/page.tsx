import Subscribertable from "@/components/modules/Subscribers/subscriber-table";
import { getAllSubscriber } from "@/services/NewsLetterSerice";




const SubscriberServer = async () => {

    const allSubscriber = await getAllSubscriber();
    const subdata = allSubscriber?.data


    return (
        <div>
            <Subscribertable subscribers={subdata} />
        </div>
    );
};

export default SubscriberServer;
