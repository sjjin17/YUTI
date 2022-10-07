echo "========== [Kafka] Zookeeper and kafka broker setting... =========="
cd devops/kafka
docker network create --gateway 172.18.0.1 --subnet 172.18.0.0/16 broker

export ZOOKEEPER_DATA_DIR=/home/broker/zookeeper-kafka-data/zoo1/data
export ZOOKEEPER_DATALOG_DIR=/home/broker/zookeeper-kafka-data/zoo1/datalog
export KAFKA1_DATA_DIR=/home/broker/zookeeper-kafka-data/kafka1/data
export KAFKA2_DATA_DIR=/home/broker/zookeeper-kafka-data/kafka2/data
export KAFKA3_DATA_DIR=/home/broker/zookeeper-kafka-data/kafka3/data

docker-compose -f docker-compose-kafka.yml up --build -d

echo "========== [Kafka] Kafka connector setting... =========="
cd kafka-connector
docker-compose -f docker-compose-kafka-connector.yml up --build -d