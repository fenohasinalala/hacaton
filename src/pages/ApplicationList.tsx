import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { NavbarHeader, TableConstructor } from '../components';
import { newJobOffer, ProjectUrl } from '../constants';
import { axiosGget, getCurrentUser } from '../hoooks';
import { Application } from '../interfaces';

interface props{
    items: Application[];
    id:number;
    setActivUpdat: React.Dispatch<React.SetStateAction<boolean>>;
  }

const ApplicationList: React.FC<props> = (props) => {

  const [items, setItems] = useState(props.items);
  const [offerActiv, setOfferActiv] = useState(newJobOffer);
  const [myToken,setMyToken] = useState<string>()
  const [id,setId] = useState<number>(props.id)
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      const subtitutionValue:string =  user.accessToken
      setMyToken(subtitutionValue);
    }
  }, []);

  useEffect(() => {
    changeItemt();
    changeOffre();
  }, [id]);

  const changeOffre = ()=>{
    axiosGget("/job-offers/"+id,myToken,setOfferActiv,null,null)
  }
  const changeItemt = ()=>{
    axiosGget("/job-offers/"+id+"/applications",myToken,setItems,null,null)
  }




  /*
        <div className='card_en-tete'><h3> <span className='entete_text'></span>{props.item.domain.name}</h3></div>
        
        <div className='card_body'>
            <p><span className='entete_text'>Poste : </span>{props.item.post}</p>
            <p><span className='entete_text'>Profil : </span> {props.item.profile}</p>
            <p><span className='entete_text'>Lieu : </span>{props.item.location}</p>
        </div>
        <div className='card_foot'>
          <Button className='custom_color_accept ' onClick={()=>{setActivFrom(true)}}>
              Voir l'annonce
          </Button>
        </div>


  */


    return (
        <>
          {NavbarHeader(
              [
                  {name:"Listes des offres d’emplois",href: (ProjectUrl + "/list-job")},
                  {name:"Listes des applications",href: (ProjectUrl + "/application")}
              ],
              {name:"Offre d’emploi",href: (ProjectUrl + "/")}
          )}

          <Container className="offreDeteils">
            <Row className="offreDeteils">
              <Col md={12}>
                <h2>{"Offre N°:"+offerActiv.reference}</h2>
              </Col>
              <Col md={12}>
                <div>
                  <Row>
                    <Col md={5}>
                      {`post:`}
                    </Col>
                    <Col md={7}>
                      {offerActiv.post}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={5}>
                      {`company:`}
                    </Col>
                    <Col md={7}>
                      {offerActiv.company}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={5}>
                      {`domain:`}
                    </Col>
                    <Col md={7}>
                      {offerActiv.domain?.name}
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>




          {items.map((item)=>{return (
            <Container>
              <Row className='contAplication jumbotron marging'>
                <Col md={{ span: 6, offset: 3 }} className="titleAplication">
                  <Row>
                    <Col md={5} className="titleApication">
                      <b>{`Reférence:`}</b>
                    </Col>
                    <Col md={7}>
                      {item.jobOffer?.reference}
                    </Col>
                  </Row>
                </Col>
                <Col md={3}></Col>
                
                <Col md={5}>
                  <Row>
                    <Col md={5}>
                    <b>{`Nom du candidat:`}</b>
                    </Col>
                    <Col md={7} className="containtApication">
                      {item.candidateName}
                    </Col>
                  </Row>
                </Col>
                <Col md={{ span: 5, offset: 2 }}>
                  <Row>
                    <Col md={5}>
                    <b>{`Email du candidat:`}</b>
                    </Col>
                    <Col md={7} className="containtApication">
                      {item.email}
                    </Col>
                  </Row>
                </Col>

                <Col md={5}>
                  <Row>
                    <Col md={5}>
                    <b>{`Date du post :`}</b>
                    </Col>
                    <Col md={7} className="containtApication">
                      {item.dateApplication}
                    </Col>
                  </Row>
                </Col>
                <Col md={{ span: 5, offset: 2 }}>
                  <Row>
                    <Col md={5}>
                    <b>{`Prétention salariale :`}</b>
                    </Col>
                    <Col md={7} className="containtApication">
                      {item.salary}
                    </Col>
                  </Row>
                </Col>

                <Col md={12}>
                  <Row>
                    <Col md={4}>
                    <b>{`Profil du candidat:`}</b>
                    </Col>
                    <Col md={8} className="containtApication">
                      {item.profile}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          )})}

        </>
    );
};

export default ApplicationList;