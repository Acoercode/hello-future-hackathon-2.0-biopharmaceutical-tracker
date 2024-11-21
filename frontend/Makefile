build:
	npm i --legacy-peer-deps
    REACT_APP_API_ROOT=https://z2gxpnpu07.execute-api.us-east-1.amazonaws.com \
	CI=false \
	npm run build
	aws s3 rm s3://hedera-biopharmaceutical-tracker.acoerlabs.com/ --recursive
	aws s3 sync build/ s3://hedera-biopharmaceutical-tracker.acoerlabs.com
	aws cloudfront create-invalidation --distribution-id=E2CYBWTB6B65LB --paths "/*"
