import * as classnames from 'classnames'
import * as React from 'react'
import Dropdown from '../Dropdown/index'

type Option = {key, text}

type Props = {
    className?: string
    label?: string
    onChange?: (evt?) => void
    options: Array<Option>
}

type State = {
    value: string
    focus: boolean
}

export default class Select extends React.PureComponent<Props, State> {
    constructor(props) {
        super(props)
        this.state = {
            focus: false,
            value: '',
        }
        this.onTextChange = this.onTextChange.bind(this)
        this.onDropdownBlur = this.onDropdownBlur.bind(this)
        this.onFocus = this.onFocus.bind(this)
        this.onItemClick = this.onItemClick.bind(this)

    }

    public render() {
        const { focus } = this.state
        const { children, className, label, onChange, options, ...props } = this.props
        const classes = classnames('sd-select-input', className, {
            filled: this.state.value ? true : false
        })

        return (
            <div className={classes}>
                {label && <label className='sd-select-input-label'>{label}</label>}
                <input
                    type='text'
                    onChange={this.onTextChange}
                    value={this.state.value}
                    onClick={this.onFocus}
                    readOnly
                />
                <Dropdown
                    show={focus ? true : false}
                    onBlur={this.onDropdownBlur}
                    items={options}
                    onItemClick={this.onItemClick}
                />
            </div>
        )
    }

    private onFocus() {
        this.setState({ focus: true })
    }

    private onDropdownBlur() {
        this.setState({focus: false})
    }

    private onTextChange(evt) {
        this.setState({value: evt.target.value})
    }

    private onItemClick(item: Option) {
        this.setState({value: item.text, focus: false})
    }
}
