import React from "react";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";

function Home({counts}) {
  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
            <h3 className="font-weight-bold">
              Welcome to Silicon Valley's premier dive cafe!
            </h3>
          </CardTitle>
          <CardSubtitle>
            We have a wonderful selection of {counts.drinks} drinks as well as {counts.snacks} snacks available
          </CardSubtitle>

        </CardBody>
      </Card>
    </section>
  );
}

export default Home;
