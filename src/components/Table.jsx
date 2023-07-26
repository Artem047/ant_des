import { Button, Modal, Space, Table, Input, Typography } from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";

const _Table = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState({});
  const [filteredData, setFilteredData] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleModal = (action) => {
    if (action === "ok") {
      if (newData.id) {
        setData((prevData) =>
          prevData.map((item) =>
            item.id === newData.id ? { ...item, ...newData } : item
          )
        );
      } else {
        setData([...data, { ...newData, id: Date.now() }]);
      }
      setFilteredData(
        filteredData.length > 0
          ? [...filteredData, { ...newData, id: Date.now() }]
          : []
      );
    }
    setIsModalOpen(false);
    setNewData({});
  };

  const handleEdit = (id) => {
    const recordToEdit = data.find((item) => item.id === id);
    setNewData({ ...recordToEdit });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Удалить запись?",
      onOk: () => {
        setData((prevData) => prevData.filter((item) => item.id !== id));
        setFilteredData(
          filteredData.length > 0
            ? filteredData.filter((item) => item.id !== id)
            : []
        );
      },
    });
  };

  const onSearch = (value) => {
    const filtered = data.filter((item) => {
      return (
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.dates.toLowerCase().includes(value.toLowerCase()) ||
        String(item.number).includes(value)
      );
    });
    setFilteredData(filtered);
  };

  const columns = [
    {
      title: "Имя",
      dataIndex: "name",
      key: "name",
      render: (text) => <Typography.Text>{text}</Typography.Text>,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Дата",
      dataIndex: "dates",
      key: "dates",
      render: (text) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: "Число",
      dataIndex: "number",
      key: "number",
      render: (text) => <Typography.Text>{text}</Typography.Text>,
      sorter: (a, b) => a.number - b.number,
    },
    {
      title: "Действия",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleEdit(record.id)}>Редактировать</Button>
          <Button onClick={() => handleDelete(record.id)}>Удалить</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space
        style={{
          marginBottom: 20,
          display: "flex",
          justifyContent: "center",
        }}>
        <Search
          placeholder="Поиск..."
          style={{ width: 500 }}
          onSearch={onSearch}
        />
        <Button
          type="dashed"
          style={{ width: 300, height: 60, fontSize: 20 }}
          onClick={showModal}>
          Добавить колонку
        </Button>
      </Space>
      <Table
        dataSource={filteredData.length > 0 ? filteredData : data}
        columns={columns}
      />
      <Modal
        width={1000}
        title="Modal"
        open={isModalOpen}
        onOk={() => handleModal("ok")}
        onCancel={() => handleModal("cancel")}>
        {columns
          .filter((column) => column.key !== "action")
          .map((column) => (
            <Input
              key={column.key}
              value={newData[column.dataIndex] || ""}
              onChange={(e) =>
                setNewData({ ...newData, [column.dataIndex]: e.target.value })
              }
              placeholder={column.title}
            />
          ))}
      </Modal>
    </div>
  );
};

export default _Table;
