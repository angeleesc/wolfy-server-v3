const marketAbI =  [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_token",
                "type": "address"
        }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "seller",
                "type": "address"
        },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "order",
                "type": "uint256"
        },
            {
                "indexed": false,
                "internalType": "address",
                "name": "NFTAddress",
                "type": "address"
        },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "ethPrice",
                "type": "uint256"
        },
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "symbol",
                        "type": "string"
            },
                    {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
            }
                ],
                "indexed": true,
                "internalType": "struct IMarket.TokenPrice[]",
                "name": "tokenPrices",
                "type": "tuple[]"
        },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "fee",
                "type": "uint256"
        }
        ],
        "name": "Ask",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "seller",
                "type": "address"
        },
            {
                "indexed": false,
                "internalType": "address",
                "name": "buyer",
                "type": "address"
        },
            {
                "indexed": false,
                "internalType": "address",
                "name": "nftAddress",
                "type": "address"
        },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "order_",
                "type": "uint256"
        },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "deltaQuantity",
                "type": "uint256"
        }
        ],
        "name": "Buy",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "seller",
                "type": "address"
        },
            {
                "indexed": false,
                "internalType": "address",
                "name": "nftAddress",
                "type": "address"
        },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "order_",
                "type": "uint256"
        }
        ],
        "name": "CancelOrder",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "seller",
                "type": "address"
        },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "order",
                "type": "uint256"
        }
        ],
        "name": "CancelSellToken",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
        },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
        }
        ],
        "name": "FeeAddressTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "seller",
                "type": "address"
        },
            {
                "indexed": false,
                "internalType": "address",
                "name": "nftAddress",
                "type": "address"
        },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "order_",
                "type": "uint256"
        },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_quantity",
                "type": "uint256"
        }
        ],
        "name": "NewOrder",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
        },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
        }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "setBy",
                "type": "address"
        },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "oldFeePercent",
                "type": "uint256"
        },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newFeePercent",
                "type": "uint256"
        }
        ],
        "name": "SetMakerFeePercent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "setBy",
                "type": "address"
        },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "oldFeePercent",
                "type": "uint256"
        },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newFeePercent",
                "type": "uint256"
        }
        ],
        "name": "SetTakerFeeFeePercent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "seller",
                "type": "address"
        },
            {
                "indexed": true,
                "internalType": "address",
                "name": "buyer",
                "type": "address"
        },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
        },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "byToken",
                "type": "bool"
        },
            {
                "indexed": false,
                "internalType": "string",
                "name": "symbol",
                "type": "string"
        },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
        },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
        },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "fee",
                "type": "uint256"
        }
        ],
        "name": "Trade",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "seller",
                "type": "address"
        },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "order",
                "type": "uint256"
        },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "ethPrice",
                "type": "uint256"
        },
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "symbol",
                        "type": "string"
            },
                    {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
            }
                ],
                "indexed": true,
                "internalType": "struct IMarket.TokenPrice[]",
                "name": "tokenPrices",
                "type": "tuple[]"
        }
        ],
        "name": "setPrices",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "PERCENTS_DIVIDER",
        "outputs": [
            {
                "internalType": "uint16",
                "name": "",
                "type": "uint16"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_order",
                "type": "uint256"
        },
            {
                "internalType": "uint256",
                "name": "_quantity",
                "type": "uint256"
        }
        ],
        "name": "buyToken",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_order",
                "type": "uint256"
        }
        ],
        "name": "cancelSellToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "feeAddr",
        "outputs": [
            {
                "internalType": "address payable",
                "name": "",
                "type": "address"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAskLength",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAsks",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
            },
                    {
                        "internalType": "uint256",
                        "name": "quantity",
                        "type": "uint256"
            },
                    {
                        "internalType": "address",
                        "name": "NFTAddress",
                        "type": "address"
            },
                    {
                        "internalType": "uint256[]",
                        "name": "tokenID",
                        "type": "uint256[]"
            },
                    {
                        "internalType": "uint256",
                        "name": "currentIndex",
                        "type": "uint256"
            },
                    {
                        "internalType": "uint256",
                        "name": "ethPrice",
                        "type": "uint256"
            },
                    {
                        "internalType": "uint256",
                        "name": "tokenPrices",
                        "type": "uint256"
            },
                    {
                        "internalType": "uint256",
                        "name": "orderId",
                        "type": "uint256"
            }
                ],
                "internalType": "struct IMarket.Order[]",
                "name": "",
                "type": "tuple[]"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
        }
        ],
        "name": "getAsksByUser",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
            },
                    {
                        "internalType": "uint256",
                        "name": "quantity",
                        "type": "uint256"
            },
                    {
                        "internalType": "address",
                        "name": "NFTAddress",
                        "type": "address"
            },
                    {
                        "internalType": "uint256[]",
                        "name": "tokenID",
                        "type": "uint256[]"
            },
                    {
                        "internalType": "uint256",
                        "name": "currentIndex",
                        "type": "uint256"
            },
                    {
                        "internalType": "uint256",
                        "name": "ethPrice",
                        "type": "uint256"
            },
                    {
                        "internalType": "uint256",
                        "name": "tokenPrices",
                        "type": "uint256"
            },
                    {
                        "internalType": "uint256",
                        "name": "orderId",
                        "type": "uint256"
            }
                ],
                "internalType": "struct IMarket.Order[]",
                "name": "",
                "type": "tuple[]"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_order",
                "type": "uint256"
        }
        ],
        "name": "getOrder",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
            },
                    {
                        "internalType": "uint256",
                        "name": "quantity",
                        "type": "uint256"
            },
                    {
                        "internalType": "address",
                        "name": "NFTAddress",
                        "type": "address"
            },
                    {
                        "internalType": "uint256[]",
                        "name": "tokenID",
                        "type": "uint256[]"
            },
                    {
                        "internalType": "uint256",
                        "name": "currentIndex",
                        "type": "uint256"
            },
                    {
                        "internalType": "uint256",
                        "name": "ethPrice",
                        "type": "uint256"
            },
                    {
                        "internalType": "uint256",
                        "name": "tokenPrices",
                        "type": "uint256"
            },
                    {
                        "internalType": "uint256",
                        "name": "orderId",
                        "type": "uint256"
            }
                ],
                "internalType": "struct IMarket.Order",
                "name": "",
                "type": "tuple"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_index",
                "type": "uint256"
        }
        ],
        "name": "getOrderByIndex",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
            },
                    {
                        "internalType": "uint256",
                        "name": "quantity",
                        "type": "uint256"
            },
                    {
                        "internalType": "address",
                        "name": "NFTAddress",
                        "type": "address"
            },
                    {
                        "internalType": "uint256[]",
                        "name": "tokenID",
                        "type": "uint256[]"
            },
                    {
                        "internalType": "uint256",
                        "name": "currentIndex",
                        "type": "uint256"
            },
                    {
                        "internalType": "uint256",
                        "name": "ethPrice",
                        "type": "uint256"
            },
                    {
                        "internalType": "uint256",
                        "name": "tokenPrices",
                        "type": "uint256"
            },
                    {
                        "internalType": "uint256",
                        "name": "orderId",
                        "type": "uint256"
            }
                ],
                "internalType": "struct IMarket.Order",
                "name": "",
                "type": "tuple"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "makerFee",
        "outputs": [
            {
                "internalType": "uint16",
                "name": "",
                "type": "uint16"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
        },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
        },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
        },
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
        }
        ],
        "name": "onERC721Received",
        "outputs": [
            {
                "internalType": "bytes4",
                "name": "",
                "type": "bytes4"
        }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256[]",
                "name": "_tokenIds",
                "type": "uint256[]"
        },
            {
                "internalType": "uint256",
                "name": "_quantity",
                "type": "uint256"
        },
            {
                "internalType": "uint256",
                "name": "ethPrice",
                "type": "uint256"
        },
            {
                "internalType": "uint256",
                "name": "_prices",
                "type": "uint256"
        },
            {
                "internalType": "address",
                "name": "nft",
                "type": "address"
        }
        ],
        "name": "readyToSellToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint16",
                "name": "makerFee_",
                "type": "uint16"
        }
        ],
        "name": "setMakerFee",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint16",
                "name": "takerFee_",
                "type": "uint16"
        }
        ],
        "name": "setTakerFee",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "takerFee",
        "outputs": [
            {
                "internalType": "uint16",
                "name": "",
                "type": "uint16"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
        }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
export default marketAbI