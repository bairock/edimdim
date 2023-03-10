import { useCallback, useEffect, useMemo, useState } from 'react'
import {
    Button,
    message,
    Table,
    Popover,
    Tag,
    Select,
    Form as AntForm,
    Input
} from 'antd'
import { useQuery, useMutation } from '@apollo/client'
import styled from 'styled-components'
import useSound from 'use-sound'

import Top from '../../../components/Top'
import Label from '../../../components/Label'

import { FIND_MANY_ORDER, FIND_MANY_ORDER_COUNT, UPDATE_ONE_ORDER } from '../../../gqls/order'

import { useUser } from '../../../utils/hooks'
import { COLORS } from '../../../utils/const'
import moment from 'moment'

const limit = 20

const Form = styled(AntForm)`
    display: flex;
    margin-bottom: 15px;

    .item {
        margin-right: 15px;
        width: 200px;
    }
`

const Info = styled.div`

    .text {
        margin-top: 5px;
    }

    .products-countainer {
        display: flex;
        flex-direction: row;
    }

    .product {
        margin-top: 10px;
        margin-right: 15px;
        width: 100px;

        .image {
            width: 100px;
            height: 100px;
            object-fit: contain;
            background-color: ${COLORS.primary.white};
        }
    }
`

const PopupMenu = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    .item {
        margin-bottom: 5px;
    }

    .cancel {
        background-color: ${COLORS.secondary.red};
        border: none;
        color: ${COLORS.primary.white};
    }

    .done {
        background-color: ${COLORS.primary.green};
        border: none;
        color: ${COLORS.primary.white};
    }
`

let interval

const Orders = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const [status, setStatus] = useState(undefined)
    const [search, setSearch] = useState('')
    const { user } = useUser('moderator')
    const [play] = useSound('/sounds/new-order.wav')

    const [update, { loading: updateLoading }] = useMutation(UPDATE_ONE_ORDER, {
        onCompleted: () => {
            message.success("???????????? ????????????????")
        },
        onError: e => {
            message.error("?????????????????? ????????????, ?????????????????? ??????????????")
        }
    })

    const variables = useMemo(() => ({
        where: {
            restaurantId: { equals: user ? user.restaurantId : '' },
            orderStatus: status !== 'all' ? { equals: status } : undefined,
            AND: [
                {
                    OR: [
                        { user: { name: { contains: search, mode: "insensitive" } } },
                        { user: { phone: { contains: search, mode: "insensitive" } } },
                    ],
                },
                {
                    OR: [
                        {
                            paymentMethod: { equals: 'offline' }
                        },
                        {
                            paymentMethod: { equals: 'online' },
                            paymentStatus: {
                                equals: 'CONFIRMED'
                            }
                        }
                    ]
                }
            ]
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: limit,
        skip: limit * (currentPage - 1)
    }), [user, search, currentPage, status])

    const countVariables = useMemo(() => ({
        ...variables,
        take: undefined,
        skip: undefined
    }), [variables])

    const { data, loading } = useQuery(FIND_MANY_ORDER, {
        variables,
        pollInterval: 1000 * 15,
        fetchPolicy: 'network-only',
        onCompleted: ({ findManyOrder }) => {
            const hasNew = findManyOrder.find(order => order.orderStatus === 'new')
            if (hasNew) {
                if (!interval) {
                    play()
                    interval = setInterval(play, 5 * 1000)
                }
            } else {
                if (interval){
                    clearInterval(interval)
                    interval = undefined
                }
            }
        },
        onError: e => {
            message.error("???? ?????????????? ???????????????? ???????????????????? ?? ??????????????, ?????????????????? ?????????????? ??????????")
        },
    })
    const { data: countData } = useQuery(FIND_MANY_ORDER_COUNT, {
        variables: countVariables,
        pollInterval: 1000 * 15,
    })

    const orders = useMemo(() => data && data.findManyOrder ? data.findManyOrder : [], [data])
    const ordersCount = useMemo(() => countData && countData.findManyOrderCount ? countData.findManyOrderCount : 0, [countData])

    useEffect(() => {
        return () => {
            if (interval) {
                clearInterval(interval)
                interval = null
            }
        }
    }, [])

    const handleChangeTable = ({ current }) => {
        setCurrentPage(current)
    }

    const renderOrderStatus = useCallback((orderStatus, obj) => {
        const { id } = obj
        let status = '??????????'
        let color = '#108ee9'
        if (orderStatus === 'confirmed') {
            status = '??????????????????????'
            color = COLORS.primary.green
        }
        if (orderStatus === 'done') {
            status = '??????????????????'
            color = COLORS.primary.green
        }
        if (orderStatus === 'canceled') {
            status = '??????????????'
            color = COLORS.secondary.red
        }
        if (orderStatus === 'done' || orderStatus === 'canceled') {
            return <Tag color={color}>{status}</Tag>
        }
        return (
            <Popover
                content={(
                    <PopupMenu>
                        {
                            orderStatus === 'new' && (
                                <Button
                                    type="primary"
                                    className="item"
                                    onClick={() => {
                                        update({
                                            variables: {
                                                where: { id },
                                                data: {
                                                    orderStatus: { set: 'confirmed' }
                                                }
                                            }
                                        })
                                    }}
                                    loading={updateLoading}
                                >
                                    ??????????????????????
                                </Button>
                            )
                        }
                        {
                            orderStatus === 'confirmed' && (
                                <Button
                                    className="item done"
                                    onClick={() => {
                                        update({
                                            variables: {
                                                where: { id },
                                                data: {
                                                    orderStatus: { set: 'done' }
                                                }
                                            }
                                        })
                                    }}
                                    loading={updateLoading}
                                >
                                    ????????????????????
                                </Button>
                            )
                        }
                        {
                            orderStatus !== 'done' && orderStatus !== 'canceled' && (
                                <Button
                                    className="item cancel"
                                    onClick={() => {
                                        update({
                                            variables: {
                                                where: { id },
                                                data: {
                                                    orderStatus: { set: 'canceled' }
                                                }
                                            }
                                        })
                                    }}
                                    loading={updateLoading}
                                >
                                    ????????????????
                                </Button>
                            )
                        }
                    </PopupMenu>
                )}
                title="???????????????? ????????????"
            >
                <Tag color={color}>{status}</Tag>
            </Popover>
        )
    }, [updateLoading, update])

    const renderPaymentStatus = (paymentStatus, paymentMethod) => {
        let status = '???????????? ?????? ??????????????????'
        let color = COLORS.primary.green
        if (paymentMethod === 'online') {
            status = '?? ??????????????????'
            color = COLORS.primary.gray
            if (paymentStatus === 'CONFIRMED') {
                status = '???????????????? ????????????'
                color = COLORS.primary.green
            }
            if (paymentStatus === 'CANCELED' || paymentStatus === 'DEADLINE_EXPIRED' || paymentStatus === 'REJECTED') {
                status = '???????????? ????????????'
                color = COLORS.secondary.red
            }
            if (paymentStatus === 'NEW') {
                status = '?????????????? ????????????????'
                color = COLORS.primary.gray
            }
        }
        return <Tag color={color}>{status}</Tag>
    }

    const renderExpandable = useCallback(({ deliveryMethod, address, comment, shipments, amount, paymentStatus, paymentMethod }) => {
        return (
            <Info>
                <Label
                    label="???????????? ????????????????"
                    value={deliveryMethod === 'delivery' ? '????????????????' : "??????????????????"}
                />
                <Label
                    label="??????????"
                    value={address}
                />
                <Label
                    label="??????????????????????"
                    value={comment}
                />
                <Label
                    column
                    label="????????????:"
                    value={
                        <div className="products-countainer">
                            {
                                shipments.map(item => (
                                    <div key={item.id} className="product">
                                        <img src={'/uploads/' + item.product.image} alt={item.product.name} className="image" />
                                        <div className="text">{item.product.name} {item.count} ????.</div>
                                    </div>
                                ))
                            }
                        </div>
                    }
                />
                <Label
                    label="????????"
                    value={amount + " ???"}
                />
                <Label
                    label='???????????? ????????????'
                    value={renderPaymentStatus(paymentStatus, paymentMethod)}
                />
            </Info>
        )
    }, [])

    const onFormSubmit = ({ status, search }) => {
        setSearch(search)
        setStatus(status)
    }

    return (
        <>
            <Top title={`???????????? ?????????????????? (${ordersCount})`} />
            <Form
                name="order-filter"
                layout="horizontal"
                onFinish={onFormSubmit}
            >

                <Form.Item
                    name={"search"}
                    className='item'
                >
                    <Input
                        placeholder="??????????"
                        allowClear
                        onChange={e => !e.target.value ? setSearch("") : null}
                    />
                </Form.Item>
                <Form.Item
                    name={"status"}
                    className='item'
                >
                    <Select
                        placeholder="??????????????"
                        allowClear
                        onChange={data => !data ? setStatus('all') : null}
                    >
                        <Select.Option value={"new"}>
                            ??????????
                        </Select.Option>
                        <Select.Option value={'confirmed'}>
                            ??????????????????????
                        </Select.Option>
                        <Select.Option value={'done'}>
                            ??????????????????
                        </Select.Option>
                        <Select.Option value={'canceled'}>
                            ??????????????
                        </Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button
                        type='primary'
                        htmlType="submit"
                    >
                        ????????????????
                    </Button>
                </Form.Item>
            </Form>
            <Table
                loading={loading}
                rowKey={(obj) => obj.id}
                dataSource={orders}
                scroll={{ x: 600 }}
                size={window.innerWidth < 500 ? 'small' : 'large'}
                pagination={{
                    current: currentPage,
                    total: ordersCount,
                    pageSize: limit
                }}
                onChange={handleChangeTable}
                columns={[
                    // {
                    //     title: '???',
                    //     dataIndex: 'id',
                    //     key: 'id',
                    //     render: (id, obj) => (
                    //         <Link to={`/admin/orders/${obj.id}`}>{id}</Link>
                    //     )
                    // },
                    {
                        title: '?????? ??????????????????',
                        dataIndex: 'name',
                        key: 'name'
                    },
                    {
                        title: '?????????????? ??????????????????',
                        dataIndex: 'phone',
                        key: 'phone',
                        render: (phone) => (
                            <a href={`tel:${phone}`}>{phone}</a>
                        )
                    },
                    {
                        title: '??????????????',
                        dataIndex: 'createdAt',
                        key: 'createdAt',
                        render: (createdAt, obj) => (
                            <span>{moment(createdAt).format("DD.MM.yyyy HH:mm")}</span>
                        )
                    },
                    {
                        title: '??????????',
                        dataIndex: 'amount',
                        key: 'amount',
                        render: (amount, obj) => (
                            <span>{amount} ???</span>
                        )
                    },
                    {
                        title: '????????????',
                        dataIndex: 'orderStatus',
                        key: 'orderStatus',
                        render: renderOrderStatus
                    }
                ]}
                expandable={{
                    expandedRowRender: renderExpandable
                }}
            />
        </>
    )
}

export default Orders