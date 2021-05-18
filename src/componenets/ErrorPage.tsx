import { Component, CSSProperties } from 'react'
import { Result, Button, Col, Row } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface Props extends RouteComponentProps {}
interface State {
    hasError: boolean;
}
class ErrorPage extends Component<Props, State> {
    state: State = {
        hasError: false
    };
    
    navigateBack = () => this.props.history.goBack();
    render() {
        return (
            <Row style={ErrorPageStyle}>
                <Col span={24} style={columnStyle}>
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={<Button type="primary" onClick={this.navigateBack} >Go Back</Button>}
                />
                </Col>
            </Row>
        )
    }
}

export default withRouter(ErrorPage);

const ErrorPageStyle: CSSProperties = {
    height: '100vh',
}

const columnStyle: CSSProperties = {
    marginTop: '10rem'
}
