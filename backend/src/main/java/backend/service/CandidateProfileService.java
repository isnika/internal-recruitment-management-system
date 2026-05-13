package backend.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import backend.DTO.candidateProdile.CandidateProfileResponse;
import backend.DTO.candidateProdile.CreateCandidateProfileRquest;

public interface CandidateProfileService {

  CandidateProfileResponse createProfile(CreateCandidateProfileRquest request);

  CandidateProfileResponse getMyProfile();

  CandidateProfileResponse getProfileById(Long userId);

  List<CandidateProfileResponse> getAllProfiles();

  CandidateProfileResponse updateMyProfile(CreateCandidateProfileRquest request);

  CandidateProfileResponse updateMyAvatar(MultipartFile file);
}
