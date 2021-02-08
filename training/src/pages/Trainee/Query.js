import { gql } from 'apollo-boost';

const GET_TRAINEE = gql`
query GetTrainee($skip: Int, $limit:Int) {
    getAllTrainees(payload: { skip: $skip, limit: $limit}){
        status
        count
    Trainees{
      name
      email
      createdAt
      originalId
      _id
    }
  }
}`;

export { GET_TRAINEE };
