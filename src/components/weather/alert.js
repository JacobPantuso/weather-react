import React from 'react'
import './styles.css';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

function Alert({ data, open, toggleOpen }) {
    //const [open, setOpen] = React.useState(false)

    return (
        <Modal
            basic
            open={open}
            size='small'
            trigger={<p><b>Click here for more details.</b></p>}
        >
            <Header icon>
                <img src={require("./warning-icon.png")} alt='warning-icon' className='warning-icon' />
                {data.event.charAt(0).toUpperCase() + data.event.slice(1)} Warning issued by {data.sender_name}
            </Header>
            <Modal.Content>
                <p className='warning-desc'>
                    {data.description.split('\n').map((item, key) => {
                        if (item.includes('Hazards:') || item.includes('Timing:') || item.includes('Discussion:')) {
                            return <span key={key}><b>{item}</b><br /></span>
                        }
                        return <span key={key}>{item}<br /></span>
                    })}
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button basic color='red' inverted onClick={toggleOpen}>
                    <Icon name='remove' /> Close Alert
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default Alert
