// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract dhie {
    // Enumeration for user role
    enum Role {
        Doctor,
        Patient,
        Buyer
    }

    // Struct to store user information
    struct User {
        string userId;
        string userAddress; //added as contract was no compiling
        string name;
        Role role;
        bool isRegistered;
    }

    struct fileOwner {
        string CID;
        bool forSale;
    }

    mapping(string => mapping(string => fileOwner)) fileUpload;

    mapping(string => mapping(string => string)) fileBought;

    // Mapping to store user information
    mapping(string => User) public users;

    // mapping(address => string) public fileOwner;

    // Event to notify registration
    // event UserRegistered(string userAddress, string name, Role role);

    // Function to register a user
    function registerUser(
        string memory _userId,
        string memory _userAddress,
        string memory _name,
        Role _role
    ) public {
        require(
            users[_userId].isRegistered == false,
            "User already registered."
        ); // changed

        users[_userId] = User(_userId, _userAddress, _name, _role, true); //changed

        // emit UserRegistered(_userId, _name, _role);
    }

    function getUserdetails(string calldata _user)
        public
        view
        returns (
            string memory,
            string memory,
            Role,
            bool
        )
    {
        string memory userAddress = users[_user].userAddress;
        string memory name = users[_user].name;
        Role role = users[_user].role;
        bool isRegistered = users[_user].isRegistered;
        return (userAddress, name, role, isRegistered);
    }

    function Uploading(
        string calldata _fileId,
        string calldata _userId,
        string calldata _CID
    ) external {
        bool _forSale = false;
        fileUpload[_userId][_fileId] = fileOwner(_CID, _forSale);
    }

    function fileForSale(string calldata _fileId, string calldata _owner)
        external
    {
        bool _forSale = true;
        fileUpload[_owner][_fileId].forSale = _forSale;
    }

    function fileNotForSale(string calldata _fileId, string calldata _owner)
        external
    {
        bool _forSale = false;
        fileUpload[_owner][_fileId].forSale = _forSale;
    }

    function sell(
        string calldata _owner,
        string calldata _userId,
        string calldata _fileId
    ) external {
        require(fileUpload[_owner][_fileId].forSale == true, "Not For Sale");
        string memory _CID = fileUpload[_owner][_fileId].CID;
        fileBought[_userId][_fileId] = _CID;
    }

    function getFileForOwner(string calldata _fileId, string calldata _owner)
        public
        view
        returns (string memory)
    {
        string memory CID = fileUpload[_owner][_fileId].CID;
        return (CID);
    }

    function getFileForBuyer(string calldata _fileId, string calldata _owner)
        public
        view
        returns (string memory)
    {
        string memory CID = fileBought[_owner][_fileId];
        return (CID);
    }
}
