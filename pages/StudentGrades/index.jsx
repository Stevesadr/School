import GradesTable from "@/Components/GradesTable/GradesTable";
import React from "react";

const index = (props) => {
  console.log(props.data);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">نمرات دانش‌آموز</h1>
      <GradesTable grades={props.data} />
    </div>
  );
};

export default index;

export async function getServerSideProps(context) {
  const token = context.req.cookies.token;
  const response = await fetch("https://schoolm.liara.run/grades/", {
    method: "GET",
    headers: {
      Authorization: `token ${token}`,
    },
  });
  const data = await response.json();
  return {
    props: { data },
  };
}
