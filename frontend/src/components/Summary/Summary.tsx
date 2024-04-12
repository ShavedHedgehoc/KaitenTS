import { useContext, useEffect, useState } from 'react'
import { TabPanel, TabView } from 'primereact/tabview'
import { Plants } from '../../consts/kaitenSpaces'
import { Context } from '../..'
import { observer } from 'mobx-react-lite'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { IBoard } from '../../models/IBoard'
import { toJS } from 'mobx'
import { InputSwitch } from 'primereact/inputswitch'
import './Summary.css'
import { IBoardsDeleteData } from '../../models/IBoardDeleteData'

function Summary() {
    const [tabIndex, setTabIndex] = useState(0)
    const [spaceId, setSpaceId] = useState<number>(Plants[0].workBoard)
    const [selectedBoards, setSelectedBoards] = useState([] as IBoard[])
    const [deleteMode, setDeleteMode] = useState(false)

    const { store } = useContext(Context)

    const fillDeleteData = (): IBoardsDeleteData => {
        console.log(selectedBoards)
        let boards: number[] = []
        selectedBoards?.map((i: IBoard) => (boards = [...boards, i.id]))
        const data = { userId: store.AuthStore.user.id, spaceId: spaceId, boards: boards }

        return data
    }

    const handleChangeTab = (index: number) => {
        setTabIndex(index)
        setSelectedBoards([])
        setSpaceId(Plants[index].workBoard)
    }

    const handleDeleteClick = () => {
        // selectedBoards?.map((i: IBoard) => console.log(toJS(i.id)))
        const delData = fillDeleteData()
        // console.log(JSON.stringify(delData))

        store.BoardStore.deleteBoard(delData)
        setSelectedBoards([])

        // selectedBoards?.map((i: IBoard) => console.log(toJS(i.id)))
    }

    const handleArchiveClick = () => {
        console.log(toJS(selectedBoards))
    }

    useEffect(() => {
        store.BoardStore.fetchBoards(spaceId)
    }, [tabIndex])

    const header = (
        <div className="summary__table_header">
            <div className="summary__table_header_delete_checker">
                <InputSwitch
                    inputId="input-metakey"
                    checked={deleteMode}
                    onChange={(e) => setDeleteMode(e.value)}
                />
                <span>Режим удаления</span>
            </div>
            <div className="summary__table_header_buttons">
                {deleteMode && (
                    <Button
                        severity="danger"
                        disabled={selectedBoards.length > 0 ? false : true}
                        onClick={() => handleDeleteClick()}
                    >
                        Удалить
                    </Button>
                )}
                <Button
                    disabled={selectedBoards.length > 0 ? false : true}
                    onClick={() => handleArchiveClick()}
                >
                    Архивировать
                </Button>
            </div>
        </div>
    )
    return (
        <div className="summary__container">
            <div className="summary__header">
                <h2>Список сводок</h2>
            </div>
            <div>
                <TabView
                    activeIndex={tabIndex}
                    onTabChange={(e) => handleChangeTab(e.index)}
                >
                    {Plants.map((plant) => (
                        <TabPanel
                            key={plant.id}
                            header={plant.name}
                        >
                            {/* should Move to separate component */}
                            {store.BoardStore.boards.length > 0 && (
                                <DataTable
                                    value={store.BoardStore.boards}
                                    header={header}
                                    selectionMode={'checkbox'}
                                    selection={selectedBoards}
                                    onSelectionChange={(e: any) => setSelectedBoards(e.value)}
                                    dataKey="id"
                                    tableStyle={{ minWidth: '50rem' }}
                                    paginator
                                    rows={5}
                                    rowsPerPageOptions={[5, 10, 25, 50]}
                                >
                                    <Column
                                        selectionMode="multiple"
                                        headerStyle={{ width: '3rem' }}
                                    ></Column>
                                    <Column
                                        field="title"
                                        header="Сводки по производству"
                                    ></Column>
                                </DataTable>
                            )}
                        </TabPanel>
                    ))}
                </TabView>
            </div>
        </div>
    )
}
export default observer(Summary)
