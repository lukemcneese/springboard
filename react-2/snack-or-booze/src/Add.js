import React, {useState} from "react";
import { Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button } from "reactstrap";

function Add({ addDrinks, addSnacks}) {
    const INTIAL_STATE = {  name : "",
                            description: "",
                            recipe: "",
                            serve: "",
                            menuType : "drinks"
                        }
    
    const [formData, setFormData] = useState(INTIAL_STATE);

    const handleChange = (e) =>{
        const {name, value} = e.target;
        if(name === "menuType"){
            console.log(value)
        }
        setFormData(formData => ({...formData, [name] : value}))
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        let type = formData.menuType;
        delete formData.menuType;
        if (type === "snacks") addSnacks({...formData, id: formData.name })
        if (type === "drinks") addDrinks({...formData, id: formData.name})
        setFormData(INTIAL_STATE)

    }
  return (
    <section>
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            Add a Drink or Snack Item
          </CardTitle>
          <Form>
              <FormGroup>
              <Label for="menuType">Drink or Snack</Label>
                <Input type="select" name="menuType" id="menuType" value={formData.menuType} onChange={handleChange}>
                    <option value="food">Snack</option>
                    <option value="drinks">Drinks</option>  
                </Input>
              </FormGroup>
              <FormGroup>
                  <Label for="name">Name</Label>
                  <Input type="text" name="name" id="name" value={formData.name} onChange={handleChange}/>
              </FormGroup>
              <FormGroup>
                  <Label for="description">Description</Label>
                  <Input type="text" name="description" id="description" value={formData.description} onChange={handleChange}/>
              </FormGroup>
              <FormGroup>
                  <Label for="recipe">Recipe</Label>
                  <Input type="text" name="recipe" id="recipe" value={formData.recipe} onChange={handleChange}/>
              </FormGroup>
              <FormGroup>
                  <Label for="serve">How should it be served?</Label>
                  <Input type="text" name="serve" id="serve" value={formData.serve} onChange={handleChange}/>
              </FormGroup>
              <Button onClick={handleSubmit}>Submit</Button>
          </Form>
        </CardBody>
      </Card>
    </section>
  );
}

export default Add;
