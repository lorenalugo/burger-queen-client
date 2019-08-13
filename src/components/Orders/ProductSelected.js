/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import plus from '../../assets/plus.png';
import minus from '../../assets/minus.png';
import deleteBtn from '../../assets/delete.png';

const Col = styled.div`
  box-sizing: border-box;
  width: 33.333%;
  padding: 5px;
  float: left;
  text-align: left;
  font-size: 14px;
  line-height: 2;
`;
const Btn = styled.img`
  box-sizing: border-box;
  height: 40px;
  width: auto;
  font-size: 16px;
  font-weight: 700;
  margin-right: 5px;
`;
const Text = styled.p`
  box-sizing: border-box;
  width: 40%;
  margin: 0;
  float: left;
  text-align: center;
  font-size: 14px;
`;

const ProducSelected = ({
  item, qty, onChangeQty, onChangeSelection,
}) => (
  <>
    <Col>
      {item.name}
    </Col>
    <Col>
      <Text>{qty}</Text>
      <Btn src={plus} alt="plus button" onClick={() => onChangeQty(item._id, (qty + 1))} />
      <Btn src={minus} alt="minus button" onClick={() => onChangeQty(item._id, (qty - 1))} />
    </Col>
    <Col>
      <Text>{qty * item.price}</Text>
      <Btn src={deleteBtn} alt="delete button" onClick={() => onChangeSelection(item._id)} />
    </Col>
  </>
);

ProducSelected.propTypes = {
  item: PropTypes.objectOf(PropTypes.string).isRequired,
  qty: PropTypes.number.isRequired,
  onChangeQty: PropTypes.func.isRequired,
  onChangeSelection: PropTypes.func.isRequired,
};

export default ProducSelected;
