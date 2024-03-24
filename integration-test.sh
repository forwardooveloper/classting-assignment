echo "[Integration Test] Run DynamoDB Local"
docker compose up -d

echo "[Integration Test] Initializing DynamoDB Local... please wait 3 seconds"
sleep 3

echo "[Integration Test] Table Creation When Table Does Not Exist"
npx cross-env DYNAMODB_TABLE_NAME=Classting-Test ts-node scripts/create-table.ts

echo "[Integration Test] Run Integration Test"
npx jest --testPathPattern=\".*\\.integration\\.test\\.ts\"

echo "[Integration Test] Table Deletion"
npx cross-env DYNAMODB_TABLE_NAME=Classting-Test ts-node scripts/delete-table.ts

echo "[Integration Test] Stop Down DynamoDB Local"
docker compose down