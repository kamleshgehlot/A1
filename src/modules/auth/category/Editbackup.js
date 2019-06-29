import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Row, Col } from 'react-bootstrap';

import Modal from '@material-ui/core/Modal';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
// import Modal from '../../../components/Modals/StandardModal'
// import Input from '../../../components/Input'
// import Textarea from '../../../components/Textarea'
// import { Success } from '../../../components/Alerts'

import { editCategory } from '../../../api/Category';
// Add Product Component
class Edit extends Component {
	constructor(props) {
		super(props);

		this.nameInput = React.createRef();

		this.state = {
			isEdit: false,
			category: {
				// name: '',
				description: '',
				isActive: true
			}
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.resetSuccess = this.resetSuccess.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}

	componentWillMount() {
		if (this.props.category) {
			let isActive = this.props.category.isActive === 1 ? true : false;
			let newProductVar = { ...this.props.category };
			newProductVar.isActive = isActive;
			this.setState({ category: newProductVar, isEdit: true });
		}
	}

	handleInput(e) {
		let value = e.target.value;
		let name = e.target.name;

		if (e.target.name === 'isActive') {
			value = e.target.checked
		}

		this.setState(prevState => {
			return {
				category: {
					...prevState.category, [name]: value
				}
			}
		}, () => console.log(this.state.category)
		)
	}

	handleSubmit(event) {
		event.preventDefault();
		const that = this;

		const config = {
			onUploadProgress: function (progressEvent) {
				var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
				that.setState({
					progress:
						Math.round((progressEvent.loaded * 100) / progressEvent.total)
				})
				console.log(percentCompleted)
			}
		}

		const formData = new FormData();
		formData.append('data', JSON.stringify(this.state.category));
		formData.append('avatar', document.getElementById('img').files[0])

		this.props.register({ formData: formData, cb: this.handleReset, config: config });
	}

	handleReset() {
		if (!this.state.isEdit) {
			this.setState({
				showSucess: true,
				category: {
					name: '',
					description: '',
					unit: '',
					img: '',
					hsnCode: '',
					isActive: true
				}
			});
		} else {
			this.setState({ showSucess: true })
		}

		this.nameInput.current.focus();
	}

	resetSuccess() {
		this.setState({ showSucess: false });
	}

	render() {
		return (
			<Modal btnText='Save' heading='Add Product' handleSubmit={this.handleSubmit} show={this.props.show} lgClose={() => this.props.lgClose(false)} handleModelClick={this.props.handleModelClick}>
				<Form>
					{this.state.showSucess ? <Success>Product {this.state.isEdit ? 'Updated' : 'Added'}  Successfully!</Success> : null}
					<Row className="show-grid">
						<Col xs={4} md={6}>
								<TextField
											label='Description:' 
											validationType='string' 
											inputRef={this.nameInput} 
											onBlur={this.resetSuccess} 
											onChange={this.handleInput} 
											value={this.state.category.description} 
											name='description' 
											id='description' 
											type='input' 
											placeholder='Enter Name Of Product'
                    />
							{/* <Input label='Description:' validationType='string' inputRef={this.nameInput} onBlur={this.resetSuccess} onChange={this.handleInput} value={this.state.category.description} name='description' id='description' type='input' placeholder='Enter Name Of Product' /> */}
						</Col>
						{/* <Col xs={4} md={6}>
							<Textarea label='Description:' validationType='string' min={2} max={1000} type='input' onChange={this.handleInput} value={this.state.category.description} name='description' id='description' placeholder='Enter Description' />
						</Col> */}
						{/* <Col xs={4} md={6}>
							<Input label='Name Of Unit:' isRequired={true} type='input' onChange={this.handleInput} value={this.state.category.unit} name='unit' id='unit' placeholder='Enter Unit' />
						</Col>
						<Col xs={4} md={6}>
							<Input label='HSN Code:' isRequired={true} onChange={this.handleInput} value={this.state.category.hsnCode} name='hsnCode' id='hsnCode' type='input' placeholder='Enter HSN Code' />
						</Col>
						<Col xs={4} md={6}>
							<Input type='file' label='Browse Image:' accept="image/*" onChange={this.handleInput} value={this.state.category.img} name='img' id='img' />
						</Col>
						<Col xs={4} md={6}>
							<Form.Group controlId="formBasicChecbox">
								<Form.Check type="checkbox" label="Active" onChange={this.handleInput} checked={this.state.category.isActive} value={this.state.category.isActive} name='isActive' id='isActive' />
							</Form.Group>
						</Col> */}

					</Row>
				</Form>
				</Modal>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		register: (category) => dispatch(addProduct(category))
	};
};

export default connect(null, mapDispatchToProps)(Edit);