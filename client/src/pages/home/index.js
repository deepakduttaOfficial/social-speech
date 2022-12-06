import Wraper from "../../components/navbar";
import Cardcom from "../../components/card";
import { useEffect, useState } from "react";
import { getPosts } from "../apiHelper/user";

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getPosts().then((res) => {
      setData(res.posts);
    });
  }, []);
  return (
    <Wraper>
      {data?.map((data, index) => {
        const { createdAt, description, title, postPhoto, user } = data;
        return (
          <Cardcom
            key={index}
            userImage={user?.photo?.secure_url || user?.name}
            userName={user?.name}
            time={createdAt}
            title={title}
            postPhoto={postPhoto?.secure_url}
            description={description}
          />
        );
      })}
    </Wraper>
  );
};

export default Home;
