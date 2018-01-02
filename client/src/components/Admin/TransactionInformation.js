import React, { Component } from "react";
import { Icon, Menu, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../../actions";

class TransactionInformation extends Component {
  componentDidMount() {
    this.props.fetchAllTransactionInformation();
  }

  render() {
    const { trans } = this.props;
    const statusString = {
      0: "Initilized",
      1: "Pending",
      2: "Completed"
    };
    return (
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>From</Table.HeaderCell>
            <Table.HeaderCell>To</Table.HeaderCell>
            <Table.HeaderCell>Value</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Time</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {trans.length !== 0
            ? trans.map(
                ({ from, to, value, status, transactionTimeStamp }, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>{index}</Table.Cell>
                    <Table.Cell>{from}</Table.Cell>
                    <Table.Cell>{to}</Table.Cell>
                    <Table.Cell>{value} Kcoins</Table.Cell>
                    <Table.Cell>{statusString[status]}</Table.Cell>
                    <Table.Cell>
                      {new Date(transactionTimeStamp).toUTCString()}
                    </Table.Cell>
                  </Table.Row>
                )
              )
            : null}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="6">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon>
                  <Icon name="left chevron" />
                </Menu.Item>
                <Menu.Item as="a">1</Menu.Item>
                <Menu.Item as="a">2</Menu.Item>
                <Menu.Item as="a">3</Menu.Item>
                <Menu.Item as="a">4</Menu.Item>
                <Menu.Item as="a" icon>
                  <Icon name="right chevron" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
}

export default connect(
  ({ adminReducer }) => ({ trans: adminReducer.transInformation }),
  actions
)(TransactionInformation);
